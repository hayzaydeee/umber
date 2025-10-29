import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../../ui/Button';
import UmberText from '../../ui/UmberText';
import { useUmbers } from '../../../hooks/useUmbers';

const FormPreviewCard = ({ 
  title,
  formType, // 'umber', 'nest', 'item'
  description,
  preview,
  onFormSubmit 
}) => {
  const [formData, setFormData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug logging
  console.log('📝 FormPreviewCard render:', {
    title,
    formType,
    description,
    formData,
    showPreview
  });

  // API hooks
  const { createUmber } = useUmbers();

  // Form configurations for each type
  const formConfigs = {
    umber: {
      fields: [
        {
          name: 'name',
          label: 'umber name',
          type: 'text',
          placeholder: 'cooking adventures',
          required: true
        },
        {
          name: 'description',
          label: 'description',
          type: 'textarea',
          placeholder: 'exploring new recipes and cooking techniques...',
          required: false
        },
        {
          name: 'color',
          label: 'choose a color',
          type: 'color',
          options: ['umber', 'sage', 'slate', 'rose', 'amber'],
          required: true
        }
      ],
      previewComponent: UmberPreview
    },
    nest: {
      fields: [
        {
          name: 'name',
          label: 'nest name',
          type: 'text',
          placeholder: 'recipes to try',
          required: true
        },
        {
          name: 'description',
          label: 'description',
          type: 'text',
          placeholder: 'interesting recipes I want to experiment with',
          required: false
        }
      ],
      previewComponent: NestPreview
    },
    item: {
      fields: [
        {
          name: 'name',
          label: 'item name',
          type: 'text',
          placeholder: 'homemade pasta recipe',
          required: true
        },
        {
          name: 'url',
          label: 'URL (optional)',
          type: 'url',
          placeholder: 'https://example.com/pasta-recipe',
          required: false
        },
        {
          name: 'notes',
          label: 'personal notes',
          type: 'textarea',
          placeholder: 'want to try this for the dinner party next week...',
          required: false
        }
      ],
      previewComponent: ItemPreview
    }
  };

  const config = formConfigs[formType];
  const PreviewComponent = config.previewComponent;

  // Update preview when form data changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      setShowPreview(true);
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let result;
      
      switch (formType) {
        case 'umber':
          // Handle umber creation directly since it doesn't need context
          result = await createUmber(formData);
          console.log(`✅ ${formType} created:`, result);
          onFormSubmit(result);
          break;
        case 'nest':
        case 'item':
          // For nest and item creation, pass form data to callback
          // The callback will handle API call with proper context (umberId, etc.)
          console.log(`📝 ${formType} form data:`, formData);
          onFormSubmit(formData);
          break;
        default:
          throw new Error(`Unknown form type: ${formType}`);
      }
      
    } catch (error) {
      console.error(`❌ Error creating ${formType}:`, error);
      // Handle error state if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = config.fields
    .filter(field => field.required)
    .every(field => formData[field.name]?.trim());

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <UmberText variant="h3" className="text-umber-800 mb-2">
          {title}
        </UmberText>
        <UmberText variant="small" className="text-umber-600">
          {description}
        </UmberText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formData[field.name] || ''}
                onChange={(value) => handleInputChange(field.name, value)}
              />
            ))}

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full mt-6"
            >
              {isSubmitting ? 'creating...' : `create ${formType}`}
            </Button>
          </form>
        </motion.div>

        {/* Preview Section */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="bg-umber-50 rounded-xl p-4 border border-umber-200"
            >
              <UmberText variant="small" className="text-umber-600 mb-3 font-medium">
                preview:
              </UmberText>
              <PreviewComponent data={formData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Form Field Component
const FormField = ({ field, value, onChange }) => {
  if (field.type === 'color') {
    return (
      <div>
        <label className="block text-sm font-medium text-umber-700 mb-2">
          {field.label}
        </label>
        <div className="grid grid-cols-5 gap-2">
          {field.options.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`
                w-full h-8 rounded-lg border-2 transition-all
                ${value === color 
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
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-umber-700 mb-2">
          {field.label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="w-full px-3 py-2 border border-umber-200 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent resize-none"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-umber-700 mb-2">
        {field.label}
      </label>
      <input
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="w-full px-3 py-2 border border-umber-200 rounded-lg focus:ring-2 focus:ring-umber-500 focus:border-transparent"
      />
    </div>
  );
};

// Preview Components
const UmberPreview = ({ data }) => (
  <div className={`p-4 rounded-lg bg-${data.color || 'umber'}-100 border border-${data.color || 'umber'}-300`}>
    <div className="flex items-center space-x-3">
      <div className={`w-4 h-4 rounded-full bg-${data.color || 'umber'}-500`} />
      <div>
        <UmberText variant="small" className="font-medium text-umber-800">
          {data.name || 'untitled umber'}
        </UmberText>
        {data.description && (
          <UmberText variant="tiny" className="text-umber-600 mt-1">
            {data.description}
          </UmberText>
        )}
      </div>
    </div>
  </div>
);

const NestPreview = ({ data }) => (
  <div className="p-3 rounded-lg bg-white border border-umber-200 shadow-sm">
    <UmberText variant="small" className="font-medium text-umber-800">
      📂 {data.name || 'untitled nest'}
    </UmberText>
    {data.description && (
      <UmberText variant="tiny" className="text-umber-600 mt-1">
        {data.description}
      </UmberText>
    )}
  </div>
);

const ItemPreview = ({ data }) => (
  <div className="p-3 rounded-lg bg-white border border-umber-200 shadow-sm">
    <UmberText variant="small" className="font-medium text-umber-800">
      {data.url ? '🔗' : '📝'} {data.name || 'untitled item'}
    </UmberText>
    {data.url && (
      <UmberText variant="tiny" className="text-blue-600 mt-1">
        {data.url}
      </UmberText>
    )}
    {data.notes && (
      <UmberText variant="tiny" className="text-umber-600 mt-1">
        {data.notes}
      </UmberText>
    )}
  </div>
);

export default FormPreviewCard;
