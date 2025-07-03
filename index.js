import React, { useState, useEffect } from 'react';
import { Settings, Users, Activity, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const FeatureFlagSystem = () => {
  const [flags, setFlags] = useState([
    {
      id: 1,
      name: 'new_jewelry_slider',
      description: 'Enhanced jewelry slider with better performance',
      enabled: true,
      rollout: 100,
      environments: ['production', 'staging'],
      createdAt: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      name: 'optimized_images',
      description: 'Lazy loading and WebP image optimization',
      enabled: true,
      rollout: 75,
      environments: ['production'],
      createdAt: '2024-01-10',
      lastModified: '2024-01-18'
    },
    {
      id: 3,
      name: 'enhanced_search',
      description: 'Advanced search with autocomplete',
      enabled: false,
      rollout: 0,
      environments: ['staging'],
      createdAt: '2024-01-12',
      lastModified: '2024-01-19'
    }
  ]);

  const [newFlag, setNewFlag] = useState({
    name: '',
    description: '',
    enabled: false,
    rollout: 0,
    environments: []
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('flags');

  const environments = ['development', 'staging', 'production'];

  const toggleFlag = (id) => {
    setFlags(flags.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled, lastModified: new Date().toISOString().split('T')[0] } : flag
    ));
  };

  const updateRollout = (id, rollout) => {
    setFlags(flags.map(flag => 
      flag.id === id ? { ...flag, rollout: parseInt(rollout), lastModified: new Date().toISOString().split('T')[0] } : flag
    ));
  };

  const deleteFlag = (id) => {
    setFlags(flags.filter(flag => flag.id !== id));
  };

  const createFlag = () => {
    if (newFlag.name && newFlag.description) {
      const flag = {
        id: Date.now(),
        ...newFlag,
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      setFlags([...flags, flag]);
      setNewFlag({ name: '', description: '', enabled: false, rollout: 0, environments: [] });
      setShowCreateForm(false);
    }
  };

  const handleEnvironmentChange = (env, checked) => {
    const updatedEnvs = checked 
      ? [...newFlag.environments, env]
      : newFlag.environments.filter(e => e !== env);
    setNewFlag({ ...newFlag, environments: updatedEnvs });
  };

  const getStatusColor = (enabled, rollout) => {
    if (!enabled) return 'bg-red-100 text-red-800';
    if (rollout === 100) return 'bg-green-100 text-green-800';
    if (rollout > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (enabled, rollout) => {
    if (!enabled) return 'Disabled';
    if (rollout === 100) return 'Full Rollout';
    if (rollout > 0) return `${rollout}% Rollout`;
    return 'Configured';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Feature Flag Management</h1>
                <p className="text-gray-600">Control feature rollouts and A/B testing</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Flag</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex space-x-0">
            {['flags', 'analytics', 'environments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Create Flag Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Feature Flag</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flag Name</label>
                <input
                  type="text"
                  value={newFlag.name}
                  onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., new_checkout_flow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newFlag.description}
                  onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the feature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rollout Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newFlag.rollout}
                  onChange={(e) => setNewFlag({ ...newFlag, rollout: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Environments</label>
                <div className="flex space-x-4">
                  {environments.map(env => (
                    <label key={env} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newFlag.environments.includes(env)}
                        onChange={(e) => handleEnvironmentChange(env, e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{env}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createFlag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Create Flag</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'flags' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Feature Flags</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{flags.filter(f => f.enabled).length} active</span>
                  <span>•</span>
                  <span>{flags.length} total</span>
                </div>
              </div>

              <div className="space-y-4">
                {flags.map((flag) => (
                  <div key={flag.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{flag.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(flag.enabled, flag.rollout)}`}>
                            {getStatusText(flag.enabled, flag.rollout)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{flag.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Created: {flag.createdAt}</span>
                          <span>Modified: {flag.lastModified}</span>
                          <span>Environments: {flag.environments.join(', ')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <label className="text-sm text-gray-600">Rollout:</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={flag.rollout}
                            onChange={(e) => updateRollout(flag.id, e.target.value)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            disabled={!flag.enabled}
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                        
                        <button
                          onClick={() => toggleFlag(flag.id)}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors ${
                            flag.enabled 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {flag.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          <span>{flag.enabled ? 'Enabled' : 'Disabled'}</span>
                        </button>
                        
                        <button
                          onClick={() => deleteFlag(flag.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Feature Flag Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Active Flags</p>
                    <p className="text-2xl font-bold text-blue-800">{flags.filter(f => f.enabled).length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Full Rollout</p>
                    <p className="text-2xl font-bold text-green-800">{flags.filter(f => f.rollout === 100).length}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600">Partial Rollout</p>
                    <p className="text-2xl font-bold text-yellow-800">{flags.filter(f => f.rollout > 0 && f.rollout < 100).length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environments' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Environment Status</h2>
            <div className="space-y-4">
              {environments.map(env => (
                <div key={env} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">{env}</h3>
                      <p className="text-sm text-gray-600">
                        {flags.filter(f => f.environments.includes(env)).length} flags configured
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureFlagSystem;
