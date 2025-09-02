# Umber Component Architecture

## App Structure Overview
```
src/
├── components/           # Reusable UI components
├── pages/               # Route-level components
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
├── contexts/            # React contexts
└── styles/              # Global styles
```

---

## Component Hierarchy

### App Level
```
App
├── AuthProvider (Context)
├── Router
  ├── PublicRoute
  │   ├── LoginPage
  │   ├── RegisterPage
  │   └── OnboardingFlow
  └── PrivateRoute
      ├── DashboardLayout
      │   ├── Sidebar
      │   ├── TopNav
      │   └── MainContent
      │       ├── DashboardPage
      │       ├── UmberListPage
      │       ├── UmberDetailPage
      │       └── ProfilePage
      └── UmberMindMap (Full screen)
```

---

## Core Components

### 1. Authentication Components

#### `AuthProvider.jsx`
```javascript
// Context provider for user state and auth methods
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Methods: login, register, logout, updateProfile
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### `LoginPage.jsx` & `RegisterPage.jsx`
- Form handling with validation
- Error state management
- Redirect after successful auth

---

### 2. Onboarding Components

#### `OnboardingFlow.jsx`
```javascript
const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [umberData, setUmberData] = useState({});
  
  return (
    <div className="onboarding-container">
      {step === 1 && <CreateFirstUmber onNext={setStep} onData={setUmberData} />}
      {step === 2 && <AddFirstItem umber={umberData} onNext={setStep} />}
      {step === 3 && <MindMapReveal umber={umberData} onComplete={() => navigate('/dashboard')} />}
    </div>
  );
};
```

#### Child Components:
- `CreateFirstUmber.jsx`
- `AddFirstItem.jsx` 
- `MindMapReveal.jsx`

---

### 3. Layout Components

#### `DashboardLayout.jsx`
```javascript
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
```

#### `Sidebar.jsx`
- Navigation between dashboard, umbers, profile
- Recent umbers quick access
- User avatar and settings

#### `TopNav.jsx`
- Search functionality (future)
- Notifications (future)
- Quick add button
- User menu

---

### 4. Dashboard Components

#### `DashboardPage.jsx`
```javascript
const DashboardPage = () => {
  const { data: dashboardData } = useDashboard();
  
  return (
    <div className="space-y-6">
      <DashboardStats stats={dashboardData.stats} />
      <RecentActivity activity={dashboardData.recentActivity} />
      <QuickActions />
      <UmberGrid umbers={dashboardData.topUmbers} />
    </div>
  );
};
```

#### Child Components:
- `DashboardStats.jsx` - Total umbers, items, value cards
- `RecentActivity.jsx` - Timeline of recent adds/purchases
- `QuickActions.jsx` - Create umber, add item buttons
- `UmberGrid.jsx` - Grid of umber cards

---

### 5. Umber Components

#### `UmberListPage.jsx`
- Grid/list view of all user's umbers
- Search and filter functionality
- Create new umber button

#### `UmberCard.jsx`
```javascript
const UmberCard = ({ umber }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border p-4"
      whileHover={{ scale: 1.02 }}
    >
      <h3>{umber.name}</h3>
      <p>{umber.itemCount} items</p>
      <p>${umber.totalValue / 100}</p>
      <div className="flex justify-between mt-4">
        <Link to={`/umbers/${umber._id}`}>View</Link>
        <Link to={`/umbers/${umber._id}/mindmap`}>Mind Map</Link>
      </div>
    </motion.div>
  );
};
```

#### `UmberDetailPage.jsx`
```javascript
const UmberDetailPage = () => {
  const { id } = useParams();
  const { data: umber } = useUmber(id);
  const [activeNest, setActiveNest] = useState('all');
  
  return (
    <div className="space-y-6">
      <UmberHeader umber={umber} />
      <NestTabs nests={umber.nests} active={activeNest} onChange={setActiveNest} />
      <ItemGrid items={getItemsForNest(umber, activeNest)} />
      <AddItemButton umberId={id} />
    </div>
  );
};
```

---

### 6. Nest Components

#### `NestTabs.jsx`
- Tab interface for switching between nests
- "All Items", "Unnested", and custom nests
- Add nest button

#### `CreateNestModal.jsx`
- Modal form for creating new nests
- Name, description, exclusivity settings

#### `NestSettings.jsx`
- Edit nest properties
- Delete nest (with item migration)

---

### 7. Item Components

#### `ItemGrid.jsx` & `ItemCard.jsx`
```javascript
const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <motion.div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="font-medium">{item.title}</h4>
        <p className="text-gray-600">${item.price / 100}</p>
        {item.whyIWantThis && (
          <p className="text-sm italic mt-2">"{item.whyIWantThis}"</p>
        )}
        <ItemActions item={item} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </motion.div>
  );
};
```

#### `AddItemModal.jsx`
```javascript
const AddItemModal = ({ isOpen, onClose, umberId }) => {
  const [url, setUrl] = useState('');
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);
  const [whyIWantThis, setWhyIWantThis] = useState('');
  
  const handleUrlScrape = async () => {
    setIsScrapingUrl(true);
    const data = await scrapeUrl(url);
    setScrapedData(data);
    setIsScrapingUrl(false);
  };
  
  // Rest of component...
};
```

#### `ItemActions.jsx`
- Edit, delete, move to nest, purchase buttons
- Context menu or dropdown

---

### 8. Mind Map Components

#### `UmberMindMap.jsx`
```javascript
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';

const UmberMindMap = () => {
  const { id } = useParams();
  const { data: mindMapData } = useMindMapData(id);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  useEffect(() => {
    if (mindMapData) {
      setNodes(mindMapData.nodes);
      setEdges(mindMapData.edges);
    }
  }, [mindMapData]);
  
  const onNodeDragStop = (event, node) => {
    updateNodePosition(node.id, node.position);
  };
  
  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
      >
        <MindMapControls />
        <Background />
      </ReactFlow>
    </div>
  );
};
```

#### Custom Node Components:
- `NestNode.jsx` - Visual representation of nests
- `ItemNode.jsx` - Visual representation of items
- `UmberNode.jsx` - Central umber node

#### `MindMapControls.jsx`
- Zoom controls
- Layout algorithms (auto-arrange)
- View mode toggles
- Back to list view button

---

## Custom Hooks

### `useAuth.jsx`
```javascript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### `useDashboard.jsx`
```javascript
export const useDashboard = () => {
  return useQuery('dashboard', fetchDashboardData);
};
```

### `useUmber.jsx`
```javascript
export const useUmber = (id) => {
  return useQuery(['umber', id], () => fetchUmber(id));
};
```

### `useMindMapData.jsx`
```javascript
export const useMindMapData = (umberId) => {
  return useQuery(['mindmap', umberId], () => fetchMindMapData(umberId));
};
```

### `useUrlScraper.jsx`
```javascript
export const useUrlScraper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const scrapeUrl = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/items/scrape', { url });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { scrapeUrl, isLoading, error };
};
```

---

## State Management Strategy

### React Query for Server State
- Cache API responses
- Background refetching
- Optimistic updates
- Error handling

### React Context for Global App State
- User authentication
- Theme preferences
- UI state (modals, sidebar collapse)

### Local Component State for UI
- Form inputs
- Modal open/close
- Temporary UI states

---

## Key Dependencies
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "react-query": "^3.39.0",
  "reactflow": "^11.10.0",
  "framer-motion": "^10.0.0",
  "tailwindcss": "^3.2.0",
  "axios": "^1.3.0"
}
```