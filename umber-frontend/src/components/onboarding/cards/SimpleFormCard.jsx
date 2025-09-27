import { useState } from 'react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';

const SimpleFormCard = ({ 
  title,
  formType,
  description,
  onFormSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'umber'
  });

  console.log('🧪 SimpleFormCard render:', { title, formType, formData });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📝 Form submitted:', formData);
    onFormSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <UmberText variant="h3" className="text-umber-800 mb-2">
          {title}
        </UmberText>
        <UmberText variant="small" className="text-umber-600">
          {description}
        </UmberText>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-umber-700 mb-2">
            umber name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="cooking adventures"
            required
            className="w-full px-3 py-2 border border-umber-200 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-umber-700 mb-2">
            description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="exploring new recipes and cooking techniques..."
            rows={3}
            className="w-full px-3 py-2 border border-umber-200 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-umber-700 mb-2">
            choose a color
          </label>
          <div className="grid grid-cols-5 gap-2">
            {['umber', 'sage', 'slate', 'rose', 'amber'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleInputChange('color', color)}
                className={`
                  w-full h-8 rounded-lg border-2 transition-all
                  ${formData.color === color 
                    ? 'border-umber-600 scale-110 shadow-md' 
                    : 'border-umber-200 hover:border-umber-400'
                  }
                  bg-${color}-400
                `}
              >
                <span className="sr-only">{color}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!formData.name.trim()}
          className="w-full mt-6"
        >
          create umber
        </Button>
      </form>

      {/* Simple Preview */}
      {formData.name && (
        <div className="mt-6 p-4 bg-umber-50 rounded-lg border border-umber-200">
          <UmberText variant="small" className="text-umber-600 mb-2 font-medium">
            preview:
          </UmberText>
          <div className={`p-3 rounded-lg bg-${formData.color}-100 border border-${formData.color}-300`}>
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full bg-${formData.color}-500`} />
              <div>
                <UmberText variant="small" className="font-medium text-umber-800">
                  {formData.name}
                </UmberText>
                {formData.description && (
                  <UmberText variant="tiny" className="text-umber-600 mt-1">
                    {formData.description}
                  </UmberText>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleFormCard;
