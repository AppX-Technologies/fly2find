export const DISCOVERY_DOCUMENT_LINK = 'https://accounts.google.com/.well-known/openid-configuration';
export const CLIENT_ID = '438771508075-q6pd74m83apqn95rmovlj8bovb10p81p.apps.googleusercontent.com';
export const CLIENT_SECRET = 'C9F0AIHEcedhQAl7koRgzCAs';
export const LOGIN_PATH =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : 'https://abraham-immobilien.web.app/login';
export const TOKEN_INFO_PATH = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
export const API_KEY = 'fkajshd^*@#&$(ajshdfuaiwe#(@)*$&@(*faksdjfiwekajdsfwaj8923288(*8HF(H*fa273HF&^';
export const BRAND_NAME = 'RatherFly';

export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby0AfloLlrqrMGdv6lhDsNTHK5JBQUa-TATZlxaVJLQgAljC89PKTX66CKdUOdHMJfmxQ/exec';

export const labelToKeyMap = {
  'Organization ID': 'organizationId',
  'Client Name': 'clientName',
  'Phone Number': 'phoneNumber'
};

export const ENDPOINTS = {
  //Users
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  LOGOUT: '/users/logout',
  FORGOT_PASSWORD: '/users/send-password-reset-link',
  RESET_PASSWORD: '/users/reset-password',
  CHANGE_PASSWORD: '/users/change-password',
  GENERATE_REGISTRATION_OTP: '/users/generate-registration-otp',
  GET_ME: '/users/me',
  GET_USER_BY_ID: id => `/users/user/${id}`,
  GET_USER_BY_USER_ID: id => `/users/user/${id}`,
  UPDATE_USER_DETAILS: '/users/update-user-details',
  CREATE_USER: '/users',
  DELETE_USER: '/users',
  UPDATE_MULTIPLE_USERS: '/users',
  USERS_LIST: '/users/search',
  UPDATE_USER: '/users/update-user-details',
  CREATE_PILOT: '/users/create-pilot'
};
export const datefields = [];

export const countyCity = {
  'Miami Dade': [
    'Miami',
    'Miami Beach',
    'Coral Gables',
    'Hialeah',
    'Miami Springs',
    'North Miami',
    'North Miami Beach',
    'Opa Locka',
    'South Miami',
    'Homestead',
    'Miami Shores',
    'Bal Harbour',
    'Bay Harbor Islands',
    'Surfside',
    'West Miami',
    'Florida City',
    'Biscayne Park',
    'El Portal',
    'Golden Beach',
    'Pinecrest',
    'Indian Creek',
    'Medley',
    'North Bay Village',
    'Key Biscayne',
    'Sweetwater',
    'Virginia Gardens',
    'Hialeah Gardens',
    'Aventura',
    'Islandia',
    'Unincorporated Miami Dade county',
    'Sunny Isles Beach',
    'Miami Lakes',
    'Palmetto Bay',
    'Miami Gardens',
    'Doral',
    'Cutler Bay'
  ],
  Broward: [
    'Coconut Creek',
    'Cooper City',
    'Coral Springs',
    'Dania Beach',
    'Davie',
    'Deerfield Beach',
    'Fort Lauderdale',
    'Hallandale Beach',
    'Hillsboro Beach',
    'Hollywood',
    'Lauderdale By the Sea',
    'Lauderdale Lakes',
    'Lauderhill',
    'Lazy lake',
    'Lighthouse point',
    'Margate',
    'Miramar',
    'North Lauderdale',
    'Oakland Park',
    'Parkland',
    'Pembroke Park',
    'Pembroke Pines',
    'Plantation',
    'Pompano',
    'Sea Ranch Lakes',
    'Southwest Ranches',
    'Sunrise',
    'Tamarac',
    'Unicorporated Broward',
    'West Park',
    'Weston',
    'Wilton Manors'
  ],
  'Palm Beach': [
    'Atlantis',
    'Belle Glade',
    'Boca Raton',
    'Boyton Beach',
    'Briny Breeze',
    'Cloud Lake',
    'Delray Beach',
    'Glen Ridge',
    'Greenacres',
    'Gulf Stream',
    'Haverhill',
    'Highland Beach',
    'Hypoluxo',
    'Juno Beach',
    'Jupiter',
    'Jupiter Inlet',
    'Lake Clark Shores',
    'Lake Park',
    'Lake Worth',
    'Lantana',
    'Manalapan',
    'Mangonia Park',
    'North Palm Beach',
    'Ocean Ridge',
    'Pahokee',
    'Palm Beach (Town)',
    'Palm Beach Gardens',
    'Palm Beach Shores',
    'Palm Springs',
    'Riviera Beach',
    'Royal Palm Beach',
    'South Bay',
    'South Palm Beach',
    'Tequesta',
    'Unicorporated PBC',
    'Village of Golf',
    'Wellington',
    'West Palm Beach'
  ],
  Alachua: ['Alachua', 'Gainesville', 'Hawthorne'],
  Baker: [],
  Bay: ['Panama city'],
  Bradford: [],
  Brevard: [
    'Cape Cañaveral',
    'Cocoa',
    'Cocoa Beach',
    'Indialantic',
    'Melbourne',
    'Melbourne Beach',
    'Palm Bay',
    'Rockledge',
    'Satellite Beach',
    'Titusville',
    'West Melbourne'
  ],
  Calhoun: ['Bloutstown'],
  Charlotte: ['Punta Gorda'],
  Citrus: ['Crystal River'],
  Clay: ['Green Cove Springs', 'Orange Park'],
  Collier: ['Everglades city', 'Marco Island', 'Naples'],
  Columbia: [],
  Desoto: [],
  Dixie: [],
  Duval: ['Atlantic Beach', 'Jacksonville', 'Neptune Beach'],
  Escambia: ['Pensacola'],
  Flagler: ['Palm Coast'],
  Franklin: ['Apalachicola'],
  Gadsden: [],
  Gilchrist: [],
  Glades: [],
  Gulf: [],
  Hamilton: [],
  Hardee: [],
  Hendry: ['Clewiston', 'Labelle'],
  Hernando: ['Brooksville'],
  Highlands: ['Avon Park'],
  Hillsborough: ['Plant city', 'Tampa', 'Temple Terrace'],
  Holmes: [],
  'Indian River': ['Vero Beach', 'Sebastian'],
  Jackson: [],
  Jefferson: [],
  Lafayette: [],
  Lake: ['Eustis', 'Fruitland Park', 'Lady Lake', 'Leesburg', 'Minneola', 'Mount Dora', 'Tavares'],
  Lee: ['Bonita Springs', 'Cape Coral', 'Fort Myers', 'Fort Myers Beach', 'Sanibel'],
  Leon: ['Tallahassee'],
  Levy: [],
  Liberty: [],
  Madison: [],
  Manatee: ['Anna Maria Island', 'Bradenton', 'Holmes Beach', 'Longboat Key', 'Palmetto'],
  Marion: ['Ocala'],
  Martin: ["Sewall's Point", 'Stuart'],
  Monroe: ['Islamorada', 'Key Largo', 'Key West'],
  Nassau: [],
  Okaloosa: ['Cinco Bayou', 'Destin', 'Fort Walton Beach', 'Niceville', 'Shalimar', 'Valparaiso'],
  Okeechobee: ['Okeechobee'],
  Orange: ['Apopka', 'Edgewood', 'Maitland', 'Ocoee', 'Orlando', 'Winter Garden', 'Winter Park'],
  Osceola: ['Celebration', 'Kissimmee', 'St. Cloud'],
  Pasco: ['New Port Richey'],
  Pinellas: [
    'Clearwater',
    'Dunedin',
    'Belleair',
    'Gulfport',
    'Largo',
    'Oldsmar',
    'Pinellas Park',
    'St. Pete Beach',
    'St. Petersburg',
    'Safety Harbor',
    'Tarpon Springs',
    'Treasure Island'
  ],
  Polk: [
    'Auburndale',
    'Bartow',
    'Eagle Lake',
    'Fort Meade',
    'Haines City',
    'Lake Alfred',
    'Lakeland',
    'Lake Wales',
    'Winter Haven'
  ],
  Putnam: ['Palatka'],
  'Santa Rosa': ['Gulf Breeze', 'Milton'],
  Sarasota: ['Longboat Key', 'North Port', 'Sarasota', 'Venice'],
  Seminole: ['Altamonte Springs', 'Casselberry', 'Lake Mary', 'Longwood', 'Oviedo', 'Sanford', 'Winter Springs'],
  'St. Johns': ['St. Augustine', 'St. Augustine Beach'],
  'St. Lucie': ['Fort Pierce', 'Port St. Lucie'],
  Sumter: [],
  Suwannee: [],
  Taylor: [],
  Union: [],
  Volusia: [
    'Dayntona Beach',
    'Deland',
    'Deltona',
    'Debary Edgewater',
    'Holly Hill',
    'New Smyrna Beach',
    'Ormond Beach',
    'Ponce Inlet',
    'Port Orange'
  ],
  Wakulla: [],
  Walton: ['DeFuniak Springs', 'Seaside'],
  Washington: ['Chipley']
};

export const indServiceMetas = [
  { key: 'lienSearch', name: 'Lien Search', requiredFields: ['Assigned Processor', 'Hard Cost', 'Processing Fee'] },
  { key: 'survey', name: 'Survey', requiredFields: ['Assigned Processor', 'Surveyor Price', 'Processing Fee'] },
  { key: 'estoppel', name: 'Estoppel', requiredFields: ['Assigned Processor', 'Hard Cost', 'Processing Fee'] }
];

export const LOGIN_MODE = 'login';
export const REGISTER_MODE = 'register';

export const DASHBOARD_SORT_BY_OPTIONS = ['Created Date', 'Updated Date'];

export const SHOWING_OPTIONS = ['10', '20', '50', '100', 'All'];
export const DEFAULT_PAGE_SIZE = 50;

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_DATE_TIME_FORMAT = 'DD/MM/YYYY, HH:mm';
export const DEFAULT_DATE_TIME_FORMAT_NON_MOMENT = 'dd/MM/yyyy, HH:mm';
export const DEFAULT_TIME_FORMAT = 'HH:mm';
export const JAUNTS = [
  {
    id: 1,
    title: 'Jaunt 1',
    brief:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus ipsam dolore quae in eveniet laudantium recusandae, quia voluptas laboriosam nesciunt voluptates perspiciatis ',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus ipsam dolore quae in eveniet laudantium recusandae, quia voluptas laboriosam nesciunt voluptates perspiciatis voluptatibus soluta ad, aliquam nisi quam? Optio mollitia eligendi nulla eius nisi. Similique, eius perferendis reprehenderit praesentium incidunt commodi a unde assumenda cumque adipisci eos dignissimos sapiente quam.',
    status: 'Review',
    thumbnail: 'https://www.w3schools.com/css/paris.jpg',
    points: 'hahahehe',
    album: ['https://www.w3schools.com/css/paris.jpg', 'https://www.w3schools.com/html/workplace.jpg'],
    steps: [
      'Lorem ipsum dolor sit amet consectetur',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vitae?wdjhfkjdshgfhjfghj',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. dlkjjkgh',
      'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vitae?wdjhfkjdshgfhjfghjLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vitae?wdjhfkjdshgfhjfghj'
    ]
  },
  {
    id: 2,
    title: 'Jaunt 2',
    brief: 'abc',
    description: 'kdljfkjk',
    status: 'Draft',
    steps: []
  },
  {
    id: 3,
    title: 'Jaunt 3',
    brief: 'abc',
    description: 'kdljfkjk',
    status: 'Draft',
    steps: []
  },
  {
    id: 4,
    title: 'Jaunt 4',
    brief: 'abc',
    description: 'kdljfkjk',
    status: 'Draft',
    steps: []
  }
];

export const DRAFT_STATUS = 'Draft';

export const REVIEW_STATUS = 'Review';

export const PUBLISHED_STATUS = 'Published';

export const STATUSES = [DRAFT_STATUS, REVIEW_STATUS, PUBLISHED_STATUS];

export const JAUNT_RELATED_FILTERS = [
  {
    key: 'status',
    label: 'Status',
    children: STATUSES
  }
];

export const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

export const ADMIN_ROLE = 'Admin';
export const PILOT_ROLE = 'Pilot';
export const ROLE_FINDER = 'Finder';

export const ALL_ROLES = [ADMIN_ROLE, ROLE_FINDER, PILOT_ROLE];

export const pilotFields = [
  { key: 'callsign', label: 'Call Sign' },
  { key: 'email', label: 'Email' },
  { key: 'heard', label: 'Heard' },
  { key: 'bestDestinationReason', label: 'Best Destination Reason' },
  { key: 'homeAirportCode', label: 'Home Airport Code' },
  { key: 'favDest', label: 'Favorite Destination' },
  { key: 'tailNumber', label: 'Tail Number' },
  { key: 'cellNumber', label: 'Cell Number' },
  { key: 'flightOptions', label: 'Flight Options' },
  { key: 'whereToSend', label: 'Where to Send' },
  { key: 'onlyFlyWeekends', label: 'Only Fly Weekends' },
  { key: 'flightTypes', label: 'Flight Types' },
  { key: 'destinationType', label: 'Destination Type' }
];
