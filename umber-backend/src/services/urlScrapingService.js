const axios = require('axios');
const cheerio = require('cheerio');

class UrlScrapingService {
  constructor() {
    this.timeout = 10000; // 10 seconds
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  }

  async scrapeUrl(url) {
    try {
      console.log(`Scraping URL: ${url}`);

      // Validate URL
      if (!this.isValidUrl(url)) {
        throw new Error('Invalid URL format');
      }

      // Fetch page content
      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive'
        }
      });

      const $ = cheerio.load(response.data);

      // Extract basic metadata
      const scrapedData = {
        url: url,
        scrapedAt: new Date(),
        title: this.extractTitle($),
        description: this.extractDescription($),
        price: this.extractPrice($),
        currency: this.extractCurrency($),
        images: this.extractImages($, url),
        brand: this.extractBrand($),
        availability: this.extractAvailability($),
        category: this.extractCategory($),
        metadata: {
          ogTitle: $('meta[property="og:title"]').attr('content'),
          ogDescription: $('meta[property="og:description"]').attr('content'),
          ogImage: $('meta[property="og:image"]').attr('content'),
          ogPrice: $('meta[property="product:price:amount"]').attr('content'),
          ogCurrency: $('meta[property="product:price:currency"]').attr('content')
        }
      };

      console.log(`Successfully scraped: ${scrapedData.title}`);
      return scrapedData;

    } catch (error) {
      console.error('URL scraping error:', error.message);
      
      // Return fallback data with error info
      return {
        url: url,
        scrapedAt: new Date(),
        title: this.extractDomainName(url),
        description: 'Failed to scrape content',
        price: 0,
        currency: 'USD',
        images: [],
        error: error.message,
        success: false
      };
    }
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  extractTitle($) {
    // Try multiple selectors for title
    const titleSelectors = [
      'h1',
      '.product-title',
      '.item-title',
      '[data-testid="product-title"]',
      'title',
      'meta[property="og:title"]'
    ];

    for (const selector of titleSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim()) {
        return element.text().trim();
      }
    }

    return 'Untitled Item';
  }

  extractDescription($) {
    // Try multiple selectors for description
    const descSelectors = [
      '.product-description',
      '.item-description',
      '.description',
      '[data-testid="product-description"]',
      'meta[name="description"]',
      'meta[property="og:description"]'
    ];

    for (const selector of descSelectors) {
      const element = $(selector).first();
      if (element.length) {
        const text = element.attr('content') || element.text().trim();
        if (text) {
          return text.substring(0, 500); // Limit description length
        }
      }
    }

    return '';
  }

  extractPrice($) {
    // Try multiple selectors for price
    const priceSelectors = [
      '.price',
      '.product-price',
      '.item-price',
      '[data-testid="price"]',
      '.price-current',
      '.current-price',
      'meta[property="product:price:amount"]'
    ];

    for (const selector of priceSelectors) {
      const element = $(selector).first();
      if (element.length) {
        const text = element.attr('content') || element.text();
        const price = this.parsePrice(text);
        if (price > 0) {
          return price;
        }
      }
    }

    return 0;
  }

  extractCurrency($) {
    // Look for currency indicators
    const currencySelectors = [
      'meta[property="product:price:currency"]',
      '.currency',
      '.price-currency'
    ];

    for (const selector of currencySelectors) {
      const element = $(selector).first();
      if (element.length) {
        const currency = element.attr('content') || element.text().trim();
        if (currency) {
          return currency.toUpperCase();
        }
      }
    }

    // Try to detect currency from price text
    const priceText = $('.price, .product-price, .item-price').first().text();
    if (priceText.includes('$')) return 'USD';
    if (priceText.includes('€')) return 'EUR';
    if (priceText.includes('£')) return 'GBP';
    if (priceText.includes('¥')) return 'JPY';

    return 'USD'; // Default
  }

  extractImages($, baseUrl) {
    const images = [];
    const imageSelectors = [
      '.product-image img',
      '.item-image img',
      '.gallery img',
      '[data-testid="product-image"] img',
      'img[alt*="product"]',
      'img[alt*="item"]'
    ];

    for (const selector of imageSelectors) {
      $(selector).each((i, img) => {
        if (images.length >= 5) return false; // Limit to 5 images

        const src = $(img).attr('src') || $(img).attr('data-src');
        if (src) {
          try {
            const imageUrl = new URL(src, baseUrl).href;
            if (!images.includes(imageUrl)) {
              images.push(imageUrl);
            }
          } catch (error) {
            // Invalid image URL, skip
          }
        }
      });

      if (images.length >= 5) break;
    }

    return images;
  }

  extractBrand($) {
    const brandSelectors = [
      '.brand',
      '.product-brand',
      '.item-brand',
      '[data-testid="brand"]',
      'meta[property="product:brand"]'
    ];

    for (const selector of brandSelectors) {
      const element = $(selector).first();
      if (element.length) {
        const brand = element.attr('content') || element.text().trim();
        if (brand) {
          return brand;
        }
      }
    }

    return '';
  }

  extractAvailability($) {
    const availabilitySelectors = [
      '.availability',
      '.stock-status',
      '.in-stock',
      '.out-of-stock',
      '[data-testid="availability"]'
    ];

    for (const selector of availabilitySelectors) {
      const element = $(selector).first();
      if (element.length) {
        const text = element.text().toLowerCase();
        if (text.includes('in stock') || text.includes('available')) {
          return 'in_stock';
        }
        if (text.includes('out of stock') || text.includes('unavailable')) {
          return 'out_of_stock';
        }
      }
    }

    return 'unknown';
  }

  extractCategory($) {
    const categorySelectors = [
      '.category',
      '.breadcrumb',
      '.product-category',
      '[data-testid="category"]'
    ];

    for (const selector of categorySelectors) {
      const element = $(selector).first();
      if (element.length) {
        const category = element.text().trim();
        if (category) {
          return category;
        }
      }
    }

    return '';
  }

  parsePrice(priceText) {
    if (!priceText) return 0;

    // Remove currency symbols and extract numbers
    const cleanText = priceText.toString().replace(/[^\d.,]/g, '');
    const price = parseFloat(cleanText.replace(/,/g, ''));
    
    return isNaN(price) ? 0 : price;
  }

  extractDomainName(url) {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'Unknown Website';
    }
  }

  // Test method for development
  async testScraping() {
    const testUrls = [
      'https://www.amazon.com/dp/B08N5WRWNW', // Example Amazon product
      'https://www.target.com', // Example Target
      'https://www.bestbuy.com' // Example Best Buy
    ];

    console.log('Testing URL scraping service...');

    for (const url of testUrls) {
      try {
        const result = await this.scrapeUrl(url);
        console.log(`\nResult for ${url}:`);
        console.log(JSON.stringify(result, null, 2));
      } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
      }
    }
  }
}

module.exports = UrlScrapingService;

// Usage example:
// const scrapingService = new UrlScrapingService();
// scrapingService.scrapeUrl('https://example.com/product').then(result => {
//   console.log(result);
// });
