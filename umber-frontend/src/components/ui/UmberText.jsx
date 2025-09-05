import React from "react";

function UmberText({ children, className = "", as = "span", ...props }) {
  const Component = as;
  
  const processText = (text) => {
    if (typeof text !== 'string') return text;
    
    // Replace all 'u' characters with styled spans
    return text.replace(/u/g, `<span class="italic font-family-display">u</span>`);
  };
  
  const processChildren = (children) => {
    if (typeof children === 'string') {
      return <span dangerouslySetInnerHTML={{ __html: processText(children) }} />;
    }
    
    // Handle arrays of children or mixed content
    return React.Children.map(children, child => {
      if (typeof child === 'string') {
        return <span dangerouslySetInnerHTML={{ __html: processText(child) }} />;
      }
      return child;
    });
  };

  return (
    <Component className={className} {...props}>
      {processChildren(children)}
    </Component>
  );
}

export default UmberText;
