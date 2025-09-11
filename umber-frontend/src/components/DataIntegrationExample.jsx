import React, { useState } from 'react';
import { useAuth, useUmbers, useNests, useItems } from '../hooks';

const DataIntegrationExample = () => {
  const { user, isAuthenticated } = useAuth();
  const { umbers, createUmber, loading: umbersLoading } = useUmbers();
  const [selectedUmberId, setSelectedUmberId] = useState(null);
  const { nests, createNest, loading: nestsLoading } = useNests(selectedUmberId);
  const [selectedNestId, setSelectedNestId] = useState(null);
  const { items, createItem, createItemFromUrl, loading: itemsLoading } = useItems(selectedNestId, selectedUmberId);

  const [formData, setFormData] = useState({
    umberName: '',
    nestName: '',
    itemName: '',
    itemUrl: ''
  });

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Authentication Required</h2>
        <p className="text-yellow-700">Please log in to test data integration features.</p>
      </div>
    );
  }

  const handleCreateUmber = async () => {
    if (!formData.umberName.trim()) return;
    
    try {
      await createUmber({
        name: formData.umberName,
        description: 'Created from frontend test',
        icon: '📚',
        color: '#8B5A2B'
      });
      setFormData(prev => ({ ...prev, umberName: '' }));
    } catch (error) {
      console.error('Failed to create umber:', error);
    }
  };

  const handleCreateNest = async () => {
    if (!formData.nestName.trim() || !selectedUmberId) return;
    
    try {
      await createNest({
        name: formData.nestName,
        description: 'Created from frontend test',
        icon: '📁'
      });
      setFormData(prev => ({ ...prev, nestName: '' }));
    } catch (error) {
      console.error('Failed to create nest:', error);
    }
  };

  const handleCreateItem = async () => {
    if (!formData.itemName.trim() || !selectedUmberId) return;
    
    try {
      await createItem({
        name: formData.itemName,
        description: 'Created from frontend test',
        price: 19.99,
        currency: 'USD'
      });
      setFormData(prev => ({ ...prev, itemName: '' }));
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  const handleCreateItemFromUrl = async () => {
    if (!formData.itemUrl.trim() || !selectedUmberId) return;
    
    try {
      await createItemFromUrl({
        url: formData.itemUrl
      });
      setFormData(prev => ({ ...prev, itemUrl: '' }));
    } catch (error) {
      console.error('Failed to create item from URL:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Integration Test</h2>
        <p className="text-gray-600 mb-4">Logged in as: {user?.name || 'Unknown'}</p>
        
        {/* Create Umber Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Create Umber</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter umber name..."
              value={formData.umberName}
              onChange={(e) => setFormData(prev => ({ ...prev, umberName: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleCreateUmber}
              disabled={umbersLoading || !formData.umberName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Umber
            </button>
          </div>
        </div>

        {/* Umbers List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Umbers ({umbers.length})</h3>
          {umbersLoading ? (
            <p className="text-gray-500">Loading umbers...</p>
          ) : umbers.length === 0 ? (
            <p className="text-gray-500">No umbers found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {umbers.map((umber) => (
                <div
                  key={umber._id}
                  onClick={() => setSelectedUmberId(umber._id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedUmberId === umber._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{umber.icon}</span>
                    <div>
                      <h4 className="font-medium">{umber.name}</h4>
                      <p className="text-sm text-gray-500">
                        {umber.totalItems || 0} items • ${umber.totalValue?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nests Section */}
        {selectedUmberId && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Create Nest</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Enter nest name..."
                value={formData.nestName}
                onChange={(e) => setFormData(prev => ({ ...prev, nestName: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleCreateNest}
                disabled={nestsLoading || !formData.nestName.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Nest
              </button>
            </div>

            <h4 className="font-medium text-gray-700 mb-2">Nests in this Umber ({nests.length})</h4>
            {nestsLoading ? (
              <p className="text-gray-500">Loading nests...</p>
            ) : nests.length === 0 ? (
              <p className="text-gray-500">No nests found. Create one above!</p>
            ) : (
              <div className="space-y-2">
                {nests.map((nest) => (
                  <div
                    key={nest._id}
                    onClick={() => setSelectedNestId(nest._id)}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedNestId === nest._id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm">{nest.icon} {nest.name} ({nest.totalItems || 0} items)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Items Section */}
        {selectedUmberId && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Create Items</h3>
            
            {/* Manual Item Creation */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter item name..."
                value={formData.itemName}
                onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleCreateItem}
                disabled={itemsLoading || !formData.itemName.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Item
              </button>
            </div>

            {/* URL Item Creation */}
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                placeholder="Enter product URL..."
                value={formData.itemUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, itemUrl: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleCreateItemFromUrl}
                disabled={itemsLoading || !formData.itemUrl.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Scrape URL
              </button>
            </div>

            <h4 className="font-medium text-gray-700 mb-2">Items ({items.length})</h4>
            {itemsLoading ? (
              <p className="text-gray-500">Loading items...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-500">No items found. Create one above!</p>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item._id} className="p-2 rounded border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                            View Source
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${item.price?.toFixed(2) || '0.00'}</span>
                        <p className="text-xs text-gray-500">{item.currency || 'USD'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataIntegrationExample;
