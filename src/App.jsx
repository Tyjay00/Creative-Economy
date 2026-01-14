import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Layout, 
  Database, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Briefcase, 
  Palette, 
  FileText, 
  ChevronDown,
  Calendar,
  DollarSign,
  Hash,
  User,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Hourglass,
  Tag,
  ArrowRight,
  Link,
  Pencil,
  X,
  History,
  Maximize2,
  Minimize2
} from 'lucide-react';

// --- Configuration & Types ---

const VIEWS = {
  DASHBOARD: 'dashboard',
  PARTNERSHIPS: 'partnerships',
  TECH_DECK: 'tech_deck'
};

const STATUS_COLORS = {
  'Active': 'bg-green-100 text-green-700 border-green-200',
  'Negotiating': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Signed': 'bg-blue-100 text-blue-700 border-blue-200',
  'Draft': 'bg-gray-100 text-gray-600 border-gray-200',
  'Review': 'bg-orange-100 text-orange-700 border-orange-200',
  'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-red-100 text-red-700 border-red-200',
  'Paused': 'bg-gray-100 text-gray-500 border-gray-200',
  'In Discussion (No Commitment)': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

// --- Parsed CSV Data Integration ---
const INITIAL_DATA = [
  {
    id: 1,
    category: 'partnerships',
    name: "Sauti Sol (Sol Generation)",
    field: "Music & Audio Production",
    status: "Active", 
    value: 0,
    contact: "Esther/Seth",
    owner: "Esther/Seth",
    date: "", 
    version: null,
    fileType: null,
    collaborationState: 'Ongoing',
    creativeExpertiseArea: 'Music Production & Industry Access',
    latestUpdate: "30+ Nairobi learners went backstage at Solfest and attended masterclasses in Dec 2025.",
    nextStep: "Engage on Press Play rollout plan for 2026 and internship conversations.",
    importance: 'Critical',
    upcomingDeadline: '',
    areasOfPartnership: '50 masterclass spots; 10 internships; Monthly fireside chats',
    historicalContext: '',
    links: ''
  },
  {
    id: 2,
    category: 'partnerships',
    name: "Zeleman",
    field: "Production / Agency",
    status: "Signed", 
    value: 0,
    contact: "Addis/Seth",
    owner: "Addis/Seth",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Planned',
    creativeExpertiseArea: 'Brand Storytelling & Content Production',
    latestUpdate: "Zeleman participated as a guest in the Creatives Unleashed festival.",
    nextStep: "Finalize job placement pathways for top-performing learners with the Addis team.",
    importance: 'Critical',
    upcomingDeadline: 'Ongoing',
    areasOfPartnership: 'Scholarships; Guaranteed job placements for top learners',
    historicalContext: '',
    links: ''
  },
  {
    id: 3,
    category: 'partnerships',
    name: "Afripods",
    field: "Podcasting",
    status: "Active", 
    value: 0,
    contact: "Seth / Tyrone",
    owner: "Seth / Tyrone",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Ongoing',
    creativeExpertiseArea: 'Podcasting Monetization',
    latestUpdate: "Hosted a networking and training session on Monetization Strategies on Nov 22.",
    nextStep: "Agree on hosting of Africa Podcast day at nairobi hub. Extending the MOU",
    importance: 'Critical',
    upcomingDeadline: 'Nov 22, 2025 (Session)',
    areasOfPartnership: 'Podcast host training; Pan-African acquisition play for the vertical strat with local training then host Podcasting monetization session virtually',
    historicalContext: 'Strategic move to provide learners with tangible "learning to earning" pathways in audio.',
    links: ''
  },
  {
    id: 4,
    category: 'partnerships',
    name: "Rap Plug Academy",
    field: "Curriculum / Tech",
    status: "Active",
    value: 0,
    contact: "Seth",
    owner: "Seth",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Ongoing',
    creativeExpertiseArea: 'Music & Audio Production',
    latestUpdate: "Working with Craig King and the milk and cookies team in Johannesburg. Craig King also connected us with Soundtrap the providers of the DAW's.",
    nextStep: "Manage Revenue Share payouts; leverage Craig for industry referrals.",
    importance: 'Critical',
    upcomingDeadline: 'Ongoing',
    areasOfPartnership: 'Curriculum partnership; Global industry referrals',
    historicalContext: '',
    links: ''
  },
  {
    id: 5,
    category: 'partnerships',
    name: "AMPD Studios",
    field: "Podcasting Studio",
    status: "Active",
    value: 0,
    contact: "Seth",
    owner: "Seth",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Paused',
    creativeExpertiseArea: 'Media Tech & Storytelling',
    latestUpdate: "We collaborated on the creation of the Dare To Be More Podcast. Jon Savage also hosted a number of Masterclasses.",
    nextStep: "Possible scaling the programmatic ad network for the Africa Podcast Network, however awaiting partner to resolve some financial challenges",
    importance: 'Critical',
    upcomingDeadline: 'Ongoing',
    areasOfPartnership: 'Possibility of securing World-class studio access in JHB; production support for content platforms. However partner is facing financial challenges.',
    historicalContext: 'Strengthens the mission to amplify African voices through top-tier production and infrastructure.',
    links: ''
  },
  {
    id: 6,
    category: 'partnerships',
    name: "Canva",
    field: "Digital Design / Freelancing",
    status: "Active", 
    value: 50000, 
    contact: "SA/Nigeria/Kenya",
    owner: "South Africa/Nigeria/Kenya",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Completed',
    creativeExpertiseArea: 'Digital Design & Visual Storytelling',
    latestUpdate: "",
    nextStep: "Drafting of the impact stories and data (results) from the campaign by the various city teams",
    importance: 'Important',
    upcomingDeadline: '',
    areasOfPartnership: 'Digital design and freelancing upskilling pathways. Sponsorship of 100 ALX All-Access Fee bursaries ($50,000 value). Providing Canva Pro subscriptions and mentorship to challenge winners. Featuring ALX success stories on Canva\'s global channels.',
    historicalContext: 'The partnership was established to address African youth unemployment by connecting digital skills to global creative industries. Challenge is only for SA, Kenya and Nigeria markets.',
    links: ''
  },
  {
    id: 7,
    category: 'partnerships',
    name: "Trace",
    field: "Media / Content",
    status: "In Discussion (No Commitment)",
    value: 0,
    contact: "Seth/Rwanda",
    owner: "Seth/Rwanda",
    date: "", 
    version: null,
    fileType: null,
    collaborationState: 'Not applicable yet',
    creativeExpertiseArea: 'Content Amplification',
    latestUpdate: "Aligned on the Rwanda, Nairobi and South Africa activation play. Main areas to agree is how to ensure Trace provides value by delivering global promotion, showcasing learner work, running expert-led residencies and in exchange ALX offers access to a learner and alumni community, top creative talent",
    nextStep: "Finalize MOU activation play for Rwanda and South Africa markets",
    importance: 'Critical',
    upcomingDeadline: '45992',
    areasOfPartnership: 'Marketing amplification; Course integration',
    historicalContext: '',
    links: ''
  },
  {
    id: 8,
    category: 'partnerships',
    name: "Soundtrap",
    field: "Production Tools",
    status: "Signed", 
    value: 25000, 
    contact: "Seth",
    owner: "Seth",
    date: "", 
    version: null,
    fileType: null,
    collaborationState: 'Planned',
    creativeExpertiseArea: 'Digital Audio Workstation (DAW)',
    latestUpdate: "",
    nextStep: "Get Soundtrap team to review and approve learner testimonials and blog format",
    importance: 'Critical',
    upcomingDeadline: '46001',
    areasOfPartnership: '250 premium DAW licenses for marketing and retention.',
    historicalContext: 'Infrastructure-led value exchange to incentivize specialization interest.',
    links: ''
  },
  {
    id: 9,
    category: 'partnerships',
    name: "Chocolate City",
    field: "Entertainment",
    status: "In Discussion (No Commitment)", 
    value: 0,
    contact: "Seth",
    owner: "Seth",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Paused',
    creativeExpertiseArea: 'Talent Development & Media',
    latestUpdate: "Partnership is on hold due to internal team dynamics on their side.",
    nextStep: "Finalize the financial model and SLA once internal dynamics resolve.",
    importance: 'Critical',
    upcomingDeadline: 'TBD',
    areasOfPartnership: 'Support for Jos Creative Hub; Founders Fund grants; talent search competitions.',
    historicalContext: 'Leading entertainment firm with a 20+ year legacy in African talent development.',
    links: ''
  },
  {
    id: 10,
    category: 'partnerships',
    name: "Motherland",
    field: "Agency",
    status: "Active", 
    value: 0,
    contact: "Ama / Steve",
    owner: "Ama / Steve",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Ongoing',
    creativeExpertiseArea: 'Agency Partnerships',
    latestUpdate: "Shared next steps with the Accra team regarding industry collaboration.",
    nextStep: "Align with the Accra team on localized on-ramping and internship playbooks.",
    importance: 'Critical',
    upcomingDeadline: 'Ongoing',
    areasOfPartnership: 'Localized agency internships/engagement',
    historicalContext: '',
    links: ''
  },
  {
    id: 11,
    category: 'partnerships',
    name: "AfreximBank",
    field: "Creative Economy Team",
    status: "In Discussion (No Commitment)", 
    value: 1000000, 
    contact: "Global Team",
    owner: "",
    date: "",
    version: null,
    fileType: null,
    collaborationState: 'Not applicable yet',
    creativeExpertiseArea: '',
    latestUpdate: "Full proposal for a large-scale project; curriculum briefs for Gastronomy, Music, Film, and Fashion submitted, awaiting feedback on success/onboarding.",
    nextStep: "",
    importance: 'Critical',
    upcomingDeadline: '',
    areasOfPartnership: 'Curriculum funding for specialized tracks to ensure vertical sustainability.',
    historicalContext: 'High-priority bid to secure almost $1M in non-MCF revenue.',
    links: ''
  },
  {
    id: 12,
    category: 'partnerships',
    name: "Afrofuture",
    field: "Events / Culture",
    status: "Draft",
    value: 0,
    contact: "TBD",
    owner: '',
    date: "TBD",
    version: null,
    fileType: null,
    collaborationState: 'Draft',
    creativeExpertiseArea: 'Events & Culture',
    latestUpdate: "",
    nextStep: "Initial touch base",
    importance: '',
    upcomingDeadline: '',
    areasOfPartnership: '',
    historicalContext: '',
    links: ''
  },
  {
    id: 13,
    category: 'partnerships',
    name: "SA Film Academy",
    field: "Film",
    status: "Draft",
    value: 0,
    contact: "TBD",
    owner: '',
    date: "TBD",
    version: null,
    fileType: null,
    collaborationState: 'Draft',
    creativeExpertiseArea: 'Film Production & Training',
    latestUpdate: "",
    nextStep: "Initial outreach",
    importance: '',
    upcomingDeadline: '',
    areasOfPartnership: '',
    historicalContext: '',
    links: ''
  },
  {
    id: 14,
    category: 'partnerships',
    name: "E Studios",
    field: "Production",
    status: "Draft",
    value: 0,
    contact: "TBD",
    owner: '',
    date: "TBD",
    version: null,
    fileType: null,
    collaborationState: 'Draft',
    creativeExpertiseArea: 'Production Support',
    latestUpdate: "",
    nextStep: "Initial outreach",
    importance: '',
    upcomingDeadline: '',
    areasOfPartnership: '',
    historicalContext: '',
    links: ''
  },
  // --- Tech Deck Items ---
  {
    id: 101,
    category: 'tech_deck',
    name: "Q4 Marketing Deck",
    status: "Draft",
    value: null,
    contact: "Design Team",
    date: "2023-10-28",
    version: "v1.2",
    fileType: "PDF",
    latestUpdate: "",
    nextStep: ""
  },
  {
    id: 102,
    category: 'tech_deck',
    name: "Brand Guidelines",
    status: "Approved",
    value: null,
    contact: "Head of Brand",
    date: "2023-09-15",
    version: "v2.0",
    fileType: "Figma",
    latestUpdate: "",
    nextStep: ""
  }
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, count, isDashboard, collapsed }) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 mb-1 group overflow-hidden ${
      active 
        ? 'bg-gray-100 text-gray-900' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    } ${collapsed ? 'justify-center' : ''}`}
  >
    <Icon size={18} className={`shrink-0 transition-colors duration-300 ${isDashboard ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"}`} />
    
    <div className={`flex items-center flex-1 overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'}`}>
      <span className="whitespace-nowrap truncate">{label}</span>
      {count > 0 && (
        <span className="ml-auto bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full shrink-0">
          {count}
        </span>
      )}
    </div>
  </button>
);

const StatusBadge = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  const isLongText = status && status.length > 15;
  
  return (
    <span className={`px-2.5 py-1 rounded-md font-medium border ${colorClass} ${isLongText ? 'text-[10px] whitespace-normal leading-tight text-center' : 'text-xs whitespace-nowrap'} inline-block`}>
      {status}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start z-10">
      <div>
        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
      </div>
      <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
      </div>
    </div>
    {trend && (
      <div className="flex items-center gap-1 text-xs text-green-600 font-medium z-10">
        <TrendingUp size={12} />
        {trend}
      </div>
    )}
    <Icon size={80} className="absolute -bottom-4 -right-4 text-gray-50 opacity-10 group-hover:scale-110 transition-transform duration-500" />
  </div>
);

const SimpleBarChart = ({ data, total }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-gray-800 font-semibold mb-6 flex items-center gap-2">
        <BarChart3 size={18} className="text-gray-400" />
        Partnership Status Breakdown
      </h3>
      <div className="flex items-end justify-between gap-4 h-40 pt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full bg-gray-100 rounded-t-lg relative h-full flex items-end overflow-hidden">
               <div 
                className={`w-full ${item.color} transition-all duration-1000 ease-out group-hover:opacity-80`}
                style={{ height: `${(item.value / max) * 100}%` }}
               ></div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-gray-700">{item.value}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-tight">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemModal = ({ isOpen, onClose, activeView, onSave, itemToEdit, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    contact: '',
    owner: '',
    value: '',
    version: '',
    fileType: '',
    field: '',
    collaborationState: '',
    creativeExpertiseArea: '',
    latestUpdate: '',
    nextStep: '',
    importance: '',
    upcomingDeadline: '',
    areasOfPartnership: '',
    historicalContext: '',
    links: ''
  });

  // Populate form when opening for edit, or reset for new
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setFormData({
          name: itemToEdit.name || '',
          status: itemToEdit.status || 'Draft',
          contact: itemToEdit.contact || '',
          owner: itemToEdit.owner || '',
          value: itemToEdit.value || '',
          version: itemToEdit.version || '',
          fileType: itemToEdit.fileType || '',
          field: itemToEdit.field || '',
          collaborationState: itemToEdit.collaborationState || '',
          creativeExpertiseArea: itemToEdit.creativeExpertiseArea || '',
          latestUpdate: itemToEdit.latestUpdate || '',
          nextStep: itemToEdit.nextStep || '',
          importance: itemToEdit.importance || '',
          upcomingDeadline: itemToEdit.upcomingDeadline || '',
          areasOfPartnership: itemToEdit.areasOfPartnership || '',
          historicalContext: itemToEdit.historicalContext || '',
          links: itemToEdit.links || ''
        });
      } else {
        setFormData({
          name: '',
          status: 'Draft',
          contact: '',
          owner: '',
          value: '',
          version: '',
          fileType: '',
          field: '',
          collaborationState: '',
          creativeExpertiseArea: '',
          latestUpdate: '',
          nextStep: '',
          importance: '',
          upcomingDeadline: '',
          areasOfPartnership: '',
          historicalContext: '',
          links: ''
        });
      }
    }
  }, [isOpen, itemToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      category: itemToEdit ? itemToEdit.category : activeView, // Keep existing category if editing
      value: formData.value ? Number(formData.value) : null
    });
  };

  const handleDelete = () => {
    if (!itemToEdit) return;
    if (window.confirm('Delete this partnership? This action cannot be undone.')) {
      onDelete && onDelete(itemToEdit.id);
      onClose();
    }
  };

  const isPartnership = (itemToEdit ? itemToEdit.category === VIEWS.PARTNERSHIPS : activeView === VIEWS.PARTNERSHIPS);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h3 className="font-semibold text-gray-800 text-lg">
            {itemToEdit ? 'Edit Item' : 'New Item'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              placeholder="Enter name..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
              <select 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option>Draft</option>
                <option>Active</option>
                <option>Negotiating</option>
                <option>Signed</option>
                <option>Review</option>
                <option>Approved</option>
                <option>Paused</option>
                <option>Rejected</option>
                <option>In Discussion (No Commitment)</option>
              </select>
            </div>
            <div>
               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                 {isPartnership ? 'Contact Person' : 'Owner'}
               </label>
               <input 
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
               />
            </div>
          </div>

          {isPartnership ? (
             <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Partnership Field</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="e.g. Music, Podcasting..."
                    value={formData.field}
                    onChange={e => setFormData({...formData, field: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Contract Value ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="0.00"
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Latest Update & Past Collabs</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                    placeholder="Recent activity..."
                    value={formData.latestUpdate}
                    onChange={e => setFormData({...formData, latestUpdate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Next Steps</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                    placeholder="What needs to happen next?"
                    value={formData.nextStep}
                    onChange={e => setFormData({...formData, nextStep: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Owner</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="Owner / contact"
                    value={formData.owner}
                    onChange={e => setFormData({...formData, owner: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Collaboration State</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm"
                    value={formData.collaborationState}
                    onChange={e => setFormData({...formData, collaborationState: e.target.value})}
                  >
                    <option value="">Select</option>
                    <option>Planned</option>
                    <option>Ongoing</option>
                    <option>Paused</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                    <option>In Discussion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Creative Expertise Area</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="e.g. Podcasting Monetization"
                    value={formData.creativeExpertiseArea}
                    onChange={e => setFormData({...formData, creativeExpertiseArea: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Importance</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm"
                    value={formData.importance}
                    onChange={e => setFormData({...formData, importance: e.target.value})}
                  >
                    <option value="">Select</option>
                    <option>Critical</option>
                    <option>Important</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Upcoming Deadline</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="YYYY-MM-DD or notes"
                    value={formData.upcomingDeadline}
                    onChange={e => setFormData({...formData, upcomingDeadline: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Areas Of Partnership</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                    placeholder="Scope or areas of partnership"
                    value={formData.areasOfPartnership}
                    onChange={e => setFormData({...formData, areasOfPartnership: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Historical Context</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none"
                    placeholder="Background / notes"
                    value={formData.historicalContext}
                    onChange={e => setFormData({...formData, historicalContext: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Links</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    placeholder="https://..."
                    value={formData.links}
                    onChange={e => setFormData({...formData, links: e.target.value})}
                  />
                </div>
             </>
          ) : (
             <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Version</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  placeholder="v1.0"
                  value={formData.version}
                  onChange={e => setFormData({...formData, version: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">File Type</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  placeholder="PDF, Figma..."
                  value={formData.fileType}
                  onChange={e => setFormData({...formData, fileType: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            {itemToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all"
              >
                Delete
              </button>
            )}
            <button 
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-all hover:shadow-md"
            >
              {itemToEdit ? 'Save Changes' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD);
  const [items, setItems] = useState(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dragState = useRef({ dragging: false, colKey: null, startX: 0, startWidth: 0 });
  const columnWidthsRef = useRef({});
  const tableContainerRef = useRef(null);
  const STORAGE_KEY = 'pt_column_widths_v1';
  const MIN_COL_WIDTH = 50;
  const MAX_COL_WIDTH = 600;
  const SAMPLE_ROWS = 8;

  // Handle Shift+Scroll for horizontal scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      if (!e.shiftKey) return;
      const container = tableContainerRef.current;
      if (!container) return;
      
      e.preventDefault();
      // Scroll horizontally based on wheel deltaY
      const scrollAmount = e.deltaY > 0 ? 50 : -50;
      container.scrollLeft += scrollAmount;
    };

    const tableElement = tableContainerRef.current;
    if (tableElement) {
      tableElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        tableElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragState.current.dragging) return;
      const dx = e.clientX - dragState.current.startX;
      const newWidth = Math.max(MIN_COL_WIDTH, dragState.current.startWidth + dx);
      setColumnWidths(prev => ({ ...prev, [dragState.current.colKey]: newWidth }));
    };
    const onMouseUp = () => {
      if (dragState.current.dragging) {
        dragState.current.dragging = false;
        dragState.current.colKey = null;
        // save persisted widths on mouse up
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(columnWidthsRef.current || {})); } catch (e) {}
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Auto-fit columns to content on first render (measure headers + sample rows)
  useEffect(() => {
    // if user has persisted widths, load them and skip auto-measure
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && Object.keys(saved).length) {
        setColumnWidths(saved);
        return;
      }
    } catch (e) {}

    // small delay to allow DOM to render
    const id = requestAnimationFrame(() => {
      const newWidths = {};
      const table = document.querySelector('.border.rounded-lg');
      if (!table) return;
      const cols = getColumns();
      cols.forEach(col => {
        const cells = Array.from(table.querySelectorAll(`div[data-col="${col.key}"]`));
        // consider header + up to SAMPLE_ROWS body cells
        const sample = cells.slice(0, SAMPLE_ROWS + 1);
        let max = 0;
        sample.forEach(el => {
          const w = el.scrollWidth;
          if (w > max) max = w;
        });
        if (max > 0) {
          const padded = Math.min(MAX_COL_WIDTH, Math.ceil(max) + 8);
          newWidths[col.key] = Math.max(MIN_COL_WIDTH, padded);
        }
      });
      setColumnWidths(prev => ({ ...newWidths, ...prev }));
    });
    return () => cancelAnimationFrame(id);
  }, [items, activeView]);

  // keep a ref and persist widths whenever they change
  useEffect(() => {
    columnWidthsRef.current = columnWidths;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(columnWidths || {})); } catch (e) {}
  }, [columnWidths]);

  const startResize = (e, colKey) => {
    e.preventDefault();
    const el = document.querySelector(`[data-col="${colKey}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragState.current = { dragging: true, colKey, startX: e.clientX, startWidth: rect.width };
  };

  // --- Logic: Filter Data based on Active View ---
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = item.category === activeView;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeView, searchQuery]);

  // --- Helper: Currency Formatter ---
  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
  };

  const formatNumber = (value) => {
    if (value == null) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // --- Logic: Dashboard Stats Calculation ---
  const dashboardStats = useMemo(() => {
    const partnerships = items.filter(i => i.category === VIEWS.PARTNERSHIPS);
    
    // Successful = Active/Delivered or Signed/Confirmed
    const successfulDeals = partnerships.filter(i => [
      'Active', 
      'Signed', 
      'Approved'
    ].includes(i.status));

    // Pipeline = Everything actively being worked on (includes Negotiating & Review)
    // "In Discussion (No Commitment)" maps to Negotiating logic
    const pipelineDeals = partnerships.filter(i => ![
      'Rejected', 
      'Paused', 
      'Draft'
    ].includes(i.status));

    const totalPipelineValue = pipelineDeals.reduce((sum, item) => sum + (item.value || 0), 0);

    // Data for mini chart
    // Mapping specific CSV statuses to chart categories
    // Updated filtering to use standard Active/Signed
    const deliveredCount = partnerships.filter(i => i.status === 'Active').length;
    const confirmedCount = partnerships.filter(i => i.status === 'Signed').length;
    const discussionCount = partnerships.filter(i => i.status === 'In Discussion (No Commitment)' || i.status === 'Negotiating').length;
    const draftCount = partnerships.filter(i => i.status === 'Draft').length;

    return {
        totalPartnerships: partnerships.length,
      totalSuccessful: successfulDeals.length,
      totalValue: totalPipelineValue,
      pendingCount: partnerships.filter(i => i.status === 'Draft' || i.status === 'In Discussion (No Commitment)').length,
      pendingValue: 0, // Placeholder
        chartData: [
            { label: 'Active', value: deliveredCount, color: 'bg-green-500' },
            { label: 'Signed', value: confirmedCount, color: 'bg-blue-500' },
            { label: 'In Disc.', value: discussionCount, color: 'bg-yellow-400' },
            { label: 'Draft', value: draftCount, color: 'bg-gray-300' },
        ]
    };
  }, [items]);

  const counts = useMemo(() => {
    return {
      [VIEWS.PARTNERSHIPS]: items.filter(i => i.category === VIEWS.PARTNERSHIPS).length,
      [VIEWS.TECH_DECK]: items.filter(i => i.category === VIEWS.TECH_DECK).length,
    };
  }, [items]);

  // --- Handler: Save (Create or Update) ---
  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ));
    } else {
      // Create new
      setItems(prev => [...prev, {
        ...itemData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (editingItem && editingItem.id === id) {
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // --- Logic: Define Columns based on View ---
  const getColumns = () => {
    // Define columns matching the spreadsheet attachments
    if (activeView === VIEWS.PARTNERSHIPS) {
      return [
        { header: 'Partner Name', key: 'name', icon: FileText, defaultWidth: 220 },
        { header: 'Partnership Field', key: 'field', icon: Tag, defaultWidth: 160, render: (val) => <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{val || '-'}</span> },
        { header: 'Status', key: 'status', icon: Hash, defaultWidth: 160, render: (val) => <StatusBadge status={val} /> },
        { header: 'Collaboration State', key: 'collaborationState', icon: Briefcase, defaultWidth: 150 },
        { header: 'Creative Expertise Area', key: 'creativeExpertiseArea', icon: Palette, defaultWidth: 200 },
        { header: 'Latest Update & Past Collaborations', key: 'latestUpdate', icon: History, defaultWidth: 300, render: (val) => <div className="text-xs text-gray-600 whitespace-normal break-words line-clamp-3">{val || '-'}</div> },
        { header: 'Key Next Steps/Partnership Status', key: 'nextStep', icon: ArrowRight, defaultWidth: 280, render: (val) => <div className="text-xs text-gray-700 whitespace-normal break-words line-clamp-3">{val || '-'}</div> },
        { header: 'Importance', key: 'importance', icon: Tag, defaultWidth: 120, render: (val) => <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{val || '-'}</span> },
        { header: 'Owner', key: 'owner', icon: User, defaultWidth: 160 },
        { header: 'Upcoming Deadline', key: 'upcomingDeadline', icon: Calendar, defaultWidth: 160 },
        { header: 'Areas of Partnership', key: 'areasOfPartnership', icon: FileText, defaultWidth: 280, render: (val) => <div className="text-xs text-gray-600 whitespace-normal break-words line-clamp-3">{val || '-'}</div> },
        { header: 'Historical Context', key: 'historicalContext', icon: History, defaultWidth: 260, render: (val) => <div className="text-xs text-gray-600 whitespace-normal break-words line-clamp-2">{val || '-'}</div> },
        { header: 'Links', key: 'links', icon: Link, defaultWidth: 100, render: (val) => val ? <a href={val} className="text-blue-600 underline text-xs" target="_blank" rel="noreferrer">Link</a> : '-' },
      ];
    }

    // Tech deck / other views keep a compact set
    return [
      { header: 'Name', key: 'name', icon: FileText, defaultWidth: 180 },
      { header: 'Date', key: 'date', icon: Calendar, defaultWidth: 120 },
      { header: 'Version', key: 'version', icon: Hash, defaultWidth: 110 },
      { header: 'Type', key: 'fileType', icon: FileText, defaultWidth: 120 },
    ];
  };

  const currentColumns = getColumns();

  return (
    <div className="flex h-screen bg-white text-gray-800 font-sans selection:bg-blue-100">
      
      {/* Sidebar - Hide if full screen */}
      {!isFullScreen && (
        <>
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="fixed left-3 top-1/2 -translate-y-1/2 z-40 bg-white border rounded-full p-2 shadow hover:bg-gray-100 hidden md:flex"
              aria-label="Open sidebar"
            >
              <ChevronDown size={16} className="rotate-90 transform" />
            </button>
          )}

          <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} border-r border-gray-200 bg-gray-50/50 flex flex-col hidden md:flex shrink-0 transition-all duration-300 ease-in-out`}>
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200/50 h-16 flex items-center justify-between overflow-hidden">
               <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs shrink-0 font-bold">N</div>
                  <span className={`font-bold text-gray-700 whitespace-nowrap transition-all duration-300 ${sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    Creative Economy
                  </span>
               </div>
               
               <button
                  onClick={() => setSidebarCollapsed(s => !s)}
                  className={`p-1 rounded hover:bg-gray-100 text-gray-500 shrink-0 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180 ml-auto mr-auto' : ''}`} // Adjust alignment if needed
               >
                  <ChevronDown size={16} className="-rotate-90" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden">
               {/* Section Header */}
               <div className={`text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider whitespace-nowrap transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                  Dashboard
               </div>
              
              <SidebarItem 
                icon={BarChart3} 
                label="Overview" 
                active={activeView === VIEWS.DASHBOARD}
                onClick={() => setActiveView(VIEWS.DASHBOARD)}
                isDashboard={true}
                collapsed={sidebarCollapsed}
              />
              
               <div className={`text-xs font-semibold text-gray-400 px-3 py-2 mt-4 uppercase tracking-wider whitespace-nowrap transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                  Database Views
               </div>
              
              <SidebarItem 
                icon={Briefcase} 
                label="Partnerships" 
                active={activeView === VIEWS.PARTNERSHIPS}
                onClick={() => setActiveView(VIEWS.PARTNERSHIPS)}
                count={counts[VIEWS.PARTNERSHIPS]}
                collapsed={sidebarCollapsed}
              />
              <SidebarItem 
                icon={Palette} 
                label="Creative Tech" 
                active={activeView === VIEWS.TECH_DECK}
                onClick={() => setActiveView(VIEWS.TECH_DECK)}
                count={counts[VIEWS.TECH_DECK]}
                collapsed={sidebarCollapsed}
              />
            </div>

            {/* Footer */}
             <div className="p-4 border-t border-gray-200 text-xs text-gray-400 whitespace-nowrap overflow-hidden flex justify-center">
               <div className={`transition-all duration-300 ${sidebarCollapsed ? 'text-center' : ''}`}>
                 {sidebarCollapsed ? 'CE' : 'Creative Economy Team'} 
               </div>
             </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header - Hide if full screen */}
        {!isFullScreen && (
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 bg-white shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="md:hidden mr-2">
                <Layout size={20} className="text-gray-500" />
              </div>
              
              <span className="flex items-center gap-2 text-gray-500">
                <Database size={16} />
                
              </span>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-2 font-medium text-gray-900 truncate">
                 {activeView === VIEWS.DASHBOARD ? <BarChart3 size={18} /> : (activeView === VIEWS.PARTNERSHIPS ? <Briefcase size={18} /> : <Palette size={18} />)}
                 {activeView === VIEWS.DASHBOARD ? 'Dashboard' : (activeView === VIEWS.PARTNERSHIPS ? 'Partnership Tracker' : 'Creative Tech Deck')}
              </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="text-xs text-gray-400 hidden sm:block">Last edited today</div>
               <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><MoreHorizontal size={20} /></button>
            </div>
          </div>
        )}

        {/* --- UNIFIED TOOLBAR --- */}
        <div className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shrink-0 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-0 border border-gray-200 rounded-md overflow-hidden shadow-sm">
             <button 
                onClick={() => setActiveView(VIEWS.DASHBOARD)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${activeView === VIEWS.DASHBOARD ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
             >
               Dashboard
             </button>
             <div className="w-[1px] bg-gray-200 h-8"></div>
             <button 
                onClick={() => setActiveView(VIEWS.PARTNERSHIPS)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${activeView === VIEWS.PARTNERSHIPS ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
             >
               Partnerships
             </button>
             <div className="w-[1px] bg-gray-200 h-8"></div>
             <button 
                onClick={() => setActiveView(VIEWS.TECH_DECK)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${activeView === VIEWS.TECH_DECK ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
             >
               Tech Deck
             </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-md w-full sm:w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200 transition-all">
              <Filter size={18} />
            </button>
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200 transition-all"
              title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
            >
              {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button 
              onClick={handleOpenNew}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition-colors whitespace-nowrap"
            >
              <Plus size={16} /> New
            </button>
          </div>
        </div>

        {/* --- CONTENT RENDER --- */}
        {activeView === VIEWS.DASHBOARD ? (
          <div className="flex-1 overflow-auto bg-gray-50/30 p-10">
            <div className="w-full mx-auto space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
                <p className="text-gray-500">Here is what is happening with your partnerships today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard 
                  title="Total Partnerships"
                  value={dashboardStats.totalPartnerships}
                  icon={Briefcase}
                  colorClass="bg-blue-500 text-blue-600"
                  trend="+7 new"
                />
                <StatCard 
                  title="Successful Deals"
                  value={dashboardStats.totalSuccessful}
                  icon={CheckCircle2}
                  colorClass="bg-green-500 text-green-600"
                  trend="High conversion"
                />

                <StatCard 
                  title="Pending Deals"
                  value={dashboardStats.pendingCount}
                  icon={Hourglass}
                  colorClass="bg-yellow-400 text-yellow-600"
                  trend={`${formatNumber(dashboardStats.pendingValue)} total`}
                />

                <StatCard 
                  title="Pipeline Value"
                  value={'$' + formatNumber(dashboardStats.totalValue)}
                  icon={DollarSign}
                  colorClass="bg-purple-500 text-purple-600"
                />
                <div className="hidden lg:block" />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SimpleBarChart 
                    data={dashboardStats.chartData} 
                    total={dashboardStats.totalPartnerships} 
                  />
                </div>

                {/* Recent Activity Mini-List */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-gray-400" />
                    Recent Successes
                  </h3>
                  <div className="space-y-3">
                    {items
                      .filter(i => i.category === VIEWS.PARTNERSHIPS && [
                        'Active', 
                        'Signed', 
                        'Approved'
                      ].includes(i.status))
                      .slice(0, 3)
                      .map(deal => (
                      <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <DollarSign size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                            <div className="text-xs text-gray-500">{deal.date || 'Ongoing'}</div>
                          </div>
                        </div>
                        <StatusBadge status={deal.status} />
                      </div>
                    ))}
                    {items.filter(i => i.category === VIEWS.PARTNERSHIPS && [
                        'Active', 
                        'Signed', 
                        'Approved'
                      ].includes(i.status)).length === 0 && (
                      <p className="text-sm text-gray-400 italic">No closed deals yet.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : activeView === VIEWS.PARTNERSHIPS ? (
          // --- PARTNERSHIPS TABLE VIEW ---
          <div className="flex-1 flex flex-col overflow-hidden px-4 sm:px-8 pb-4 pt-6">
            <div ref={tableContainerRef} className="flex-1 border border-gray-200 rounded-lg overflow-auto shadow-sm relative bg-white">
              <div className="inline-block min-w-full align-middle">
              {/* Table Header */}
              <div className="sticky top-0 z-10 flex items-center bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {currentColumns.map((col) => {
                  const computedWidth = columnWidths[col.key] ?? col.defaultWidth ?? 120;
                  return (
                  <div
                    key={col.key}
                    data-col={col.key}
                    className={`relative px-4 py-4 flex items-center gap-2 border-r border-gray-200 last:border-r-0 flex-none overflow-hidden bg-gray-50`}
                    style={{ width: `${computedWidth}px`, minHeight: '56px' }}
                  >
                    <col.icon size={11} className="text-gray-400" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 font-semibold">{col.header}</span>
                    </div>

                    <div
                      onMouseDown={(e) => startResize(e, col.key)}
                      className="absolute -right-1 top-0 bottom-0 w-2 cursor-col-resize z-10"
                      title="Drag to resize"
                    />
                  </div>
                )})}
                <div className="w-24 px-2 py-3 border-l border-gray-200 text-center bg-gray-50">Edit</div>
              </div>

              {/* Table Body */}
              <div>
                {filteredItems.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                    <Database size={48} className="mb-4 opacity-20" />
                    <p>No items found.</p>
                    <button onClick={handleOpenNew} className="text-blue-600 hover:underline mt-2 text-sm">Create one?</button>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onDoubleClick={() => handleOpenEdit(item)}
                      role="button"
                      tabIndex={0}
                      className="flex items-center border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
                    >
                      
                      {currentColumns.map((col) => {
                        const computedWidth = columnWidths[col.key] ?? col.defaultWidth ?? 120;
                        return (
                        <div
                          key={`${item.id}-${col.key}`}
                          data-col={col.key}
                          className={`px-4 py-4 text-sm border-r border-transparent group-hover:border-gray-100 last:border-r-0 flex-none overflow-hidden whitespace-normal break-words`}
                          style={{ width: `${computedWidth}px`, minHeight: '80px', display: 'flex', alignItems: 'center' }}
                        >
                          {col.key === 'status' ? (
                            <StatusBadge status={item[col.key]} />
                          ) : col.key === 'name' ? (
                            <span className="font-medium text-gray-900">{item[col.key]}</span>
                          ) : (
                            <span className="text-gray-600">
                              {col.render ? col.render(item[col.key]) : (item[col.key] || <span className="text-gray-300">-</span>)}
                            </span>
                          )}
                        </div>
                      )})}
                      
                      {/* Row Actions */}
                      <div className="w-24 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity border-l border-transparent group-hover:border-gray-100">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-md transition-colors"
                          title="Edit Item"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Table Footer / New Row Ghost */}
              <div 
                onClick={handleOpenNew}
                className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-50 cursor-pointer border-t border-gray-100 text-sm"
              >
                <Plus size={16} className="mr-2" />
                New
              </div>
              </div>
            </div>
          </div>
        ) : activeView === VIEWS.TECH_DECK ? (
          // --- CREATE TECH DASHBOARD (split: Professional Foundations & Creative Tech Specialization) ---
          <div className="flex-1 overflow-auto bg-gray-50 p-8">
            <div className="w-full max-w-7xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Creative Tech Dashboard</h2>
                
              </div>

              {/* Professional Foundations */}
              <section aria-labelledby="prof-foundations" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 id="prof-foundations" className="text-lg font-semibold text-gray-800">Creative Tech Specialization</h3>
                  <div className="text-sm text-gray-400">Cohort snapshots & specialisations</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-xs text-gray-500 uppercase tracking-wide">Item Annual Target</h4>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold">Paid learners</div>
                        <div className="text-sm text-gray-500">Annual target</div>
                      </div>
                      <div className="text-4xl font-extrabold text-blue-600">18,000</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-xs text-gray-500 uppercase tracking-wide">Graduation Rate</h4>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold">Graduates</div>
                        <div className="text-sm text-gray-500">Annual expected</div>
                      </div>
                      <div className="text-4xl font-extrabold text-green-600">9,000</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Selection Dashboard — Tracks Overview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="text-xs text-gray-500 uppercase">
                          <th className="py-2 pr-4">Track</th>
                          <th className="py-2 pr-4">Started Application</th>
                          <th className="py-2 pr-4">Total Enrolled</th>
                          <th className="py-2 pr-4">Total Paid</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { name: 'AI for creatives', started: 4200, enrolled: 3200, paid: 2800 },
                          { name: 'Music and Audio Production', started: 3800, enrolled: 3000, paid: 2600 },
                          { name: 'Graphic Design', started: 2500, enrolled: 2100, paid: 1800 },
                          { name: 'Content creation', started: 2700, enrolled: 2200, paid: 1900 }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-3 pr-4 font-medium text-gray-900">{row.name}</td>
                            <td className="py-3 pr-4 text-gray-600">{formatNumber(row.started)}</td>
                            <td className="py-3 pr-4 text-gray-600">{formatNumber(row.enrolled)}</td>
                            <td className="py-3 pr-4 text-gray-600">{formatNumber(row.paid)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Professional Foundations */}
              <section aria-labelledby="ct-specialization" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 id="ct-specialization" className="text-lg font-semibold text-gray-800">Professional Foundations</h3>
                  
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800">Cohort 9</h4>
                    <div className="mt-4 text-gray-700">
                      <div className="flex justify-between"><span>Total Enrolled</span><strong>{formatNumber(3385)}</strong></div>
                      <div className="flex justify-between mt-2"><span>Activated</span><strong>{formatNumber(786)}</strong></div>
                      <div className="text-xs text-gray-400 mt-3">Conversion: 23%</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800">Cohort 10</h4>
                    <div className="mt-4 text-gray-700">
                      <div className="flex justify-between"><span>Total Enrolled</span><strong>{formatNumber(3649)}</strong></div>
                      <div className="flex justify-between mt-2"><span>Activated</span><strong>{formatNumber(2007)}</strong></div>
                      <div className="text-xs text-gray-400 mt-3">Week 13 grace period</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800">Cohort 11</h4>
                    <div className="mt-4 text-gray-700">
                      <div className="flex justify-between"><span>Total Enrolled</span><strong>{formatNumber(2508)}</strong></div>
                      <div className="flex justify-between mt-2"><span>Activated</span><strong>{formatNumber(1442)}</strong></div>
                      <div className="text-xs text-gray-400 mt-3">Week 12</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Cohort Specialisations Snapshot</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Cohort 1</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>AI for creatives — Enrolled: 420</li>
                        <li>Music and Audio Production — Enrolled: 380</li>
                        <li>Graphic Design — Enrolled: 250</li>
                        <li>Content creation — Enrolled: 270</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Cohort 2</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>AI for creatives — Enrolled: 320</li>
                        <li>Music and Audio Production — Enrolled: 300</li>
                        <li>Graphic Design — Enrolled: 210</li>
                        <li>Content creation — Enrolled: 220</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Cohort 3</h4>
                      <p className="text-sm text-gray-500">Yet to start — planning phase.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : null}

      </div>

      <ItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        activeView={activeView === VIEWS.DASHBOARD ? VIEWS.PARTNERSHIPS : activeView}
        onSave={handleSaveItem}
        itemToEdit={editingItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}