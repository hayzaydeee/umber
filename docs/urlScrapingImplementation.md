# URL Scraping Implementation Guide

## Overview
Extract product information from URLs to populate items automatically. Focus on reliability and speed for MVP.

---

## Option 1: Microlink API (Recommended for MVP)
*Fastest to implement, reliable, handles edge cases*

### Setup
```bash
npm install @microlink/mql
```

### Implementation
```javascript
// utils/urlScraper.js
import mql from '@microlink/mql';

export const scrapeUrl = async (url) => {
  try {
    const { data } = await mql(url, {
      data: {
        title: {
          selector: 'title',
          type: 'text'
        },
        description: {
          selector: 'meta[name="description"]',
          attr: 'content'
        },
        image: {
          selector: 'meta[property="og:image"]',
          attr: 'content',
          type: 'image'
        },
        price: [
          // Multiple selectors for different sites
          { selector: '[data-testid="price"]', type: 'text' },
          { selector: '.price', type: 'text' },
          { selector: '[class*="price"]', type: 'text' },
          { selector: 'meta[property="product:price:amount"]', attr: 'content' }
        ],
        availability: [
          { selector: '[data-testid="availability"]', type: 'text' },
          { selector: '.availability', type: 'text' },
          { selector: 'meta[property="product:availability"]', attr: 'content' }
        ]
      }
    });

    return {
      title: cleanTitle(data.title),
      description: data.description,
      image: data.image?.url,
      price: extractPrice(data.price),
      currency: 'USD', // Default, could be detected
      availability: normalizeAvailability(data.availability),
      scrapedAt: new Date()
    };
  } catch (error) {
    console.error('Microlink scraping failed:', error);
    throw new Error('Failed to scrape URL');
  }
};

// Helper functions
const cleanTitle = (title) => {
  if (!title) return 'Untitled Item';
  return title.replace(/\s+/g, ' ').trim().slice(0, 200);
};

const extractPrice = (priceData) => {
  if (!priceData) return null;
  
  const priceText = typeof priceData === 'string' ? priceData : priceData[0];
  if (!priceText) return null;
  
  // Extract numbers from price text
  const match = priceText.match(/[\d,]+\.?\d*/);
  if (match) {
    return Math.round(parseFloat(match[0].replace(/,/g, '')) * 100); // Convert to cents
  }
  return null;
};

const normalizeAvailability = (availability) => {
  if (!availability) return 'unknown';
  
  const availText = typeof availability === 'string' ? availability : availability[0];
  const text = availText?.toLowerCase() || '';
  
  if (text.includes('in stock') || text.includes('available')) return 'in stock';
  if (text.includes('out of stock') || text.includes('sold out')) return 'out of stock';
  if (text.includes('preorder') || text.includes('pre-order')) return 'preorder';
  
  return 'unknown';
};
```

### API Endpoint
```javascript
// API route: /api/items/scrape
app.post('/api/items/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ 
        error: 'Valid URL is required' 
      });
    }

    const scrapedData = await scrapeUrl(url);
    
    res.json({
      success: true,
      data: scrapedData,
      originalUrl: url
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to scrape URL',
      message: error.message,
      fallback: {
        title: extractDomainName(url),
        image: null,
        price: null,
        description: null
      }
    });
  }
});

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const extractDomainName = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '').split('.')[0];
  } catch {
    return 'Unknown Item';
  }
};
```

---

## Option 2: Puppeteer (Custom Solution)
*More control, but slower and more complex*

### Setup
```bash
npm install puppeteer
```

### Implementation
```javascript
// utils/puppeteerScraper.js
import puppeteer from 'puppeteer';

export const scrapeUrlWithPuppeteer = async (url) => {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set user agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    );
    
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 10000 
    });

    const data = await page.evaluate(() => {
      // Get title
      const title = document.querySelector('title')?.textContent ||
                   document.querySelector('h1')?.textContent;

      // Get image - try multiple selectors
      const imageSelectors = [
        'meta[property="og:image"]',
        'meta[name="twitter:image"]',
        '[data-testid="product-image"] img',
        '.product-image img',
        'img[src*="product"]'
      ];
      
      let image = null;
      for (const selector of imageSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          image = element.getAttribute('content') || element.src;
          if (image && image.startsWith('http')) break;
        }
      }

      // Get price - site-specific selectors
      const priceSelectors = [
        '[data-testid="price"]',
        '.price',
        '[class*="price"]',
        '[id*="price"]',
        'meta[property="product:price:amount"]'
      ];
      
      let price = null;
      for (const selector of priceSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          price = element.textContent || element.getAttribute('content');
          if (price && /\d/.test(price)) break;
        }
      }

      // Get description
      const description = document.querySelector('meta[name="description"]')
        ?.getAttribute('content');

      return { title, image, price, description };
    });

    return {
      ...data,
      title: data.title?.trim().slice(0, 200) || 'Untitled Item',
      price: extractPrice(data.price),
      currency: 'USD',
      scrapedAt: new Date()
    };

  } catch (error) {
    console.error('Puppeteer scraping failed:', error);
    throw new Error('Failed to scrape URL with Puppeteer');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
```

---

## Site-Specific Optimizations

### Amazon Products
```javascript
const scrapeAmazon = async (page) => {
  return await page.evaluate(() => {
    return {
      title: document.querySelector('#productTitle')?.textContent?.trim(),
      price: document.querySelector('.a-price-whole')?.textContent,
      image: document.querySelector('#landingImage')?.src,
      availability: document.querySelector('#availability span')?.textContent,
      brand: document.querySelector('#bylineInfo')?.textContent
    };
  });
};
```

### Shopify Stores
```javascript
const scrapeShopify = async (page) => {
  return await page.evaluate(() => {
    return {
      title: document.querySelector('.product-title, h1[class*="title"]')?.textContent?.trim(),
      price: document.querySelector('.price, [class*="price"]')?.textContent,
      image: document.querySelector('.product-image img, [class*="product-image"] img')?.src,
      availability: document.querySelector('[class*="inventory"], [class*="stock"]')?.textContent
    };
  });
};
```

---

## Fallback Strategy

### When Scraping Fails
```javascript
const handleScrapingFailure = (url, error) => {
  console.error('Scraping failed:', error);
  
  return {
    title: extractTitleFromUrl(url),
    description: null,
    image: null,
    price: null,
    currency: 'USD',
    availability: 'unknown',
    scrapedAt: new Date(),
    scrapingFailed: true,
    originalUrl: url
  };
};

const extractTitleFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    const path = urlObj.pathname;
    
    // Try to extract product name from URL path
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment && lastSegment.length > 3) {
      return lastSegment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .slice(0, 100);
    }
    
    return `Item from ${domain}`;
  } catch {
    return 'Unknown Item';
  }
};
```

---

## Frontend Integration

### React Hook for URL Scraping
```javascript
// hooks/useUrlScraper.js
import { useState } from 'react';

export const useUrlScraper = () => {
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [scrapingError, setScrapingError] = useState(null);

  const scrapeUrl = async (url) => {
    setIsScrapingUrl(true);
    setScrapingError(null);
    
    try {
      const response = await fetch('/api/items/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ url })
      });

      const result = await response.json();
      
      if (!response.ok) {
        // Use fallback data if available
        if (result.fallback) {
          return result.fallback;
        }
        throw new Error(result.message || 'Scraping failed');
      }

      return result.data;
    } catch (error) {
      setScrapingError(error.message);
      throw error;
    } finally {
      setIsScrapingUrl(false);
    }
  };

  return { 
    scrapeUrl, 
    isScrapingUrl, 
    scrapingError,
    clearError: () => setScrapingError(null)
  };
};
```

### Usage in AddItemModal
```javascript
const AddItemModal = ({ isOpen, onClose, umberId }) => {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState(null);
  const { scrapeUrl, isScrapingUrl, scrapingError } = useUrlScraper();

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      const data = await scrapeUrl(url);
      setScrapedData(data);
    } catch (error) {
      // Error already handled by hook
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleUrlSubmit} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste any product URL..."
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        
        <button 
          type="submit" 
          disabled={isScrapingUrl}
          className="btn-primary"
        >
          {isScrapingUrl ? 'Scraping...' : 'Get Product Info'}
        </button>

        {scrapingError && (
          <div className="text-red-600 text-sm">
            {scrapingError}
          </div>
        )}

        {scrapedData && (
          <ProductPreview 
            data={scrapedData} 
            onConfirm={handleAddItem}
          />
        )}
      </form>
    </Modal>
  );
};
```

---

## Performance & Rate Limiting

### Caching Strategy
```javascript
// Simple in-memory cache for recent scrapes
const scrapeCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedScrape = (url) => {
  const cached = scrapeCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedScrape = (url, data) => {
  scrapeCache.set(url, {
    data,
    timestamp: Date.now()
  });
};
```

### Rate Limiting
```javascript
// Simple rate limiting per user
const userScrapeAttempts = new Map();
const MAX_SCRAPES_PER_MINUTE = 10;

const checkRateLimit = (userId) => {
  const now = Date.now();
  const attempts = userScrapeAttempts.get(userId) || [];
  
  // Remove attempts older than 1 minute
  const recentAttempts = attempts.filter(time => now - time < 60000);
  
  if (recentAttempts.length >= MAX_SCRAPES_PER_MINUTE) {
    throw new Error('Too many scraping attempts. Please wait a moment.');
  }
  
  recentAttempts.push(now);
  userScrapeAttempts.set(userId, recentAttempts);
};
```

---

## Production Considerations

### Environment Variables
```bash
# .env
MICROLINK_API_KEY=your_microlink_key  # Optional, for higher limits
SCRAPING_TIMEOUT=10000
ENABLE_PUPPETEER=false  # Start with Microlink only
```

### Error Monitoring
- Log scraping failures with URL and error details
- Monitor success rates by domain
- Track which sites need custom handling
- Set up alerts for high failure rates

### Scaling
- Start with Microlink for MVP (1000 free requests/month)
- Add Puppeteer for sites that Microlink can't handle
- Consider ScrapingBee or similar services for production scale
- Implement queue system for batch scraping if needed