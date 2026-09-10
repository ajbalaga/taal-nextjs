const SERVICES = [
  { id: "biz", code: "BPLO 01", name: "Business Permit", office: "Business Permits & Licensing Office", window: "Window 3, ground floor",
    desc: "New and renewal permits to operate a business within Taal. Renewals are filed every January.",
    reqs: ["DTI or SEC registration", "Barangay business clearance", "Lease contract or tax declaration of the site", "Sanitary permit and fire safety clearance", "Latest community tax certificate"],
    fee: "\u20b1 500 +", feeNote: "Mayor's permit fee varies with capital and line of business; paid at the Treasurer's Office.",
    time: "1\u20132 working days", timeNote: "Same-day release for renewals with complete documents." },
  { id: "bldg", code: "MEO 04", name: "Building Permit", office: "Municipal Engineering Office", window: "Window 6, ground floor",
    desc: "Required before any construction, renovation, or demolition. Heritage-zone properties need an additional review.",
    reqs: ["Five sets of signed plans and specifications", "Lot title or authorization from the owner", "Barangay clearance", "Structural computations for two storeys and above", "Heritage clearance if within the historic core"],
    fee: "By assessment", feeNote: "Computed on floor area and use under the National Building Code schedule.",
    time: "5\u201310 working days", timeNote: "Longer for projects inside the declared heritage zone." },
  { id: "brgy", code: "BRGY 02", name: "Barangay Clearance", office: "Barangay hall of residence", window: "See the barangay directory",
    desc: "Certification of residency and good standing, commonly required for employment, permits, and IDs.",
    reqs: ["Valid government ID", "Proof of residency in the barangay", "Cedula for some barangays"],
    fee: "\u20b1 50\u2013100", feeNote: "Set by each barangay ordinance.",
    time: "Within the day", timeNote: "Subject to the barangay secretary's office hours." },
  { id: "cedula", code: "MTO 03", name: "Cedula (Community Tax Certificate)", office: "Municipal Treasurer's Office", window: "Window 1, ground floor",
    desc: "Annual community tax certificate for residents and businesses; frequently required as a supporting document.",
    reqs: ["Valid government ID", "Latest payslip or income statement, if employed", "Previous cedula, if renewing"],
    fee: "\u20b1 5 +", feeNote: "Basic tax plus an additional amount based on gross income or receipts.",
    time: "Over the counter", timeNote: "Issued while you wait." },
  { id: "senior", code: "OSCA 05", name: "Senior Citizen ID & Booklet", office: "Office for Senior Citizens Affairs", window: "Annex, beside the Municipal Hall",
    desc: "Discount ID and purchase booklet for residents aged 60 and above.",
    reqs: ["PSA birth certificate or any proof of age", "One 1x1 photo", "Proof of residency in Taal", "Personal appearance of the applicant"],
    fee: "Free", feeNote: "No fee is collected for the ID or the booklet.",
    time: "3\u20135 working days", timeNote: "Claim at the OSCA office; a representative needs an authorization letter." }
];

const NEWS = [
  { tag: "Advisory", cat: "advisory", date: "08 Sep 2026", title: "Class suspension in all levels due to heavy rainfall", blurb: "Following PAGASA's orange rainfall warning over Batangas, classes in both public and private schools are suspended. Government work continues under skeletal force.", source: "Office of the Mayor / MDRRMO" },
  { tag: "Health", cat: "health", date: "05 Sep 2026", title: "Free anti-rabies vaccination for pets, September rounds", blurb: "The Municipal Agriculture Office will hold barangay-based vaccination from 8:00AM. Bring pets leashed or caged.", source: "Municipal Agriculture Office" },
  { tag: "Events", cat: "events", date: "02 Sep 2026", title: "Preparations open for the Feast of San Martin de Tours", blurb: "Barangay delegations may register for the parade and the embroidery exhibit at the Tourism Office until October 15.", source: "Municipal Tourism Office" },
  { tag: "Advisory", cat: "advisory", date: "28 Aug 2026", title: "Water interruption along Calle Agoncillo, 29\u201330 August", blurb: "Service will be interrupted from 9:00PM to 4:00AM for pipe replacement. Residents are advised to store water in advance.", source: "Taal Water District" },
  { tag: "Health", cat: "health", date: "22 Aug 2026", title: "Rural Health Unit extends prenatal clinic to Saturdays", blurb: "Prenatal consultations are now available every Saturday, 8:00AM\u201312:00NN, at the main health center in Poblacion.", source: "Municipal Health Office" },
  { tag: "Events", cat: "events", date: "15 Aug 2026", title: "Heritage walking tours resume every weekend", blurb: "Guided walks of the Poblacion depart from the Basilica plaza at 9:00AM and 3:00PM, Saturdays and Sundays.", source: "Municipal Tourism Office" }
];

const OFFICES = [
  { name: "Office of the Mayor", does: "Executive matters, endorsements, mayor's clearance.", head: "Naereeza Grace M. Bainto, Municipal Mayor", phone: "(043) 740-6183 \u00b7 (043) 706-3366", email: "mayor@taal.gov.ph" },
  { name: "Sangguniang Bayan", does: "Ordinances, resolutions, council records.", head: "Michael Rey A. Villano, Municipal Vice Mayor", phone: "(043) 740-6181 \u00b7 (043) 706-4417", email: "vicemayor@taal.gov.ph" },
  { name: "Office of the Municipal Administrator", does: "Coordination of departments, administrative concerns.", head: "Atty. Carlota Cerde\u00f1as", phone: "(043) 706-3504", email: "administration@taal.gov.ph" },
  { name: "Municipal Treasurer's Office", does: "Real property tax, cedula, business and permit fees.", head: "Ma. Perpetua Maripel Q. Castillo", phone: "(043) 706-4542", email: "treasury@taal.gov.ph" },
  { name: "Municipal Assessor's Office", does: "Tax declarations, property appraisal.", head: "Pureza O. Biscocho", phone: "(043) 706-4563", email: "assessor@taal.gov.ph" },
  { name: "Municipal Civil Registrar", does: "Birth, marriage, and death records.", head: "Atty. Vladimir Bedural", phone: "(043) 706-4583", email: "lcr@taal.gov.ph" },
  { name: "Municipal Engineering Office", does: "Building, occupancy, and excavation permits.", head: "Engr. Amando A. Matanguihan", phone: "(043) 706-4593", email: "engineering@taal.gov.ph" },
  { name: "MDRRM Office", does: "Disaster response, rescue, weather advisories.", head: "\u2014", phone: "(043) 706-3504 \u00b7 Ambulance (043) 706-4492", email: "\u2014" },
  { name: "Municipal Health Office", does: "Consultations, immunization, sanitary permits.", head: "Dra. Cailanie B. Mayuga", phone: "(043) 706-3391", email: "rhu@taal.gov.ph" },
  { name: "MSWD Office", does: "Social welfare, AICS, PWD and solo parent IDs.", head: "Raquel O. Ojano", phone: "(043) 706-3390", email: "dswd@taal.gov.ph" },
  { name: "Municipal Tourism Office", does: "Heritage tours, events, visitor information.", head: "Maria Elizabeth Quinto", phone: "(043) 706-3368", email: "tourism@taal.gov.ph" },
  { name: "Municipal Agriculture Office", does: "Farmer and fisherfolk programs, animal health.", head: "Maribel O. Simara", phone: "(043) 706-4594", email: "agriculture@taal.gov.ph" },
  { name: "Municipal Accounting Office", does: "Disbursements, vouchers, financial records.", head: "Acct. Joselito A. Panganiban", phone: "(043) 706-4543", email: "accounting@taal.gov.ph" },
  { name: "Municipal Budget Office", does: "Annual budget preparation and monitoring.", head: "Lorna B. Bautista", phone: "(043) 706-4581", email: "budget@taal.gov.ph" },
  { name: "MPDC Office", does: "Development planning, statistics, project studies.", head: "Maria Rowena C. Almazan", phone: "(043) 408-1819 \u00b7 (043) 706-4459", email: "mpdc@taal.gov.ph" },
  { name: "MENRO Office", does: "Solid waste, environmental compliance.", head: "Engr. Mhelda Grace L. Leyma", phone: "(043) 706-4513", email: "\u2014" },
  { name: "General Services Office", does: "Supplies, equipment, municipal facilities.", head: "Edward E. Alvarez", phone: "(043) 706-4462 \u00b7 (043) 740-6182", email: "gso@taal.gov.ph" },
  { name: "Personnel Office", does: "Employment records, appointments, HR concerns.", head: "Leana Editha M. Abuan", phone: "(043) 706-4522", email: "personnel@taal.gov.ph" },
  { name: "SB Secretariat", does: "Session records, minutes, legislative documents.", head: "Severiano Alcantara", phone: "(043) 706-4493", email: "\u2014" },
  { name: "Municipal Market", does: "Stall applications, market operations.", head: "\u2014", phone: "(043) 706-3387", email: "\u2014" },
  { name: "Philippine National Police \u2013 Taal", does: "Police assistance, blotter, clearances.", head: "PSI Apolinario Inzon Lunar Jr.", phone: "0905 349 3734 \u00b7 (043) 740-0010", email: "\u2014" },
  { name: "Bureau of Fire Protection \u2013 Taal", does: "Fire response, fire safety inspection clearances.", head: "Elias Tominez, Fire Marshall Insp.", phone: "(043) 408-1806 \u00b7 0921 726 2470", email: "\u2014" },
  { name: "Commission on Elections", does: "Voter registration and election matters.", head: "May DV. Gaylan, Election Officer III", phone: "(043) 408-0577", email: "\u2014" }
];

const BARANGAYS = ["Apacay","Balisong","Bihis","Bolbok","Buli","Butong","Caysasay","Cawit","Cubamba","Cultihan","Gahol","Halang","Iba","Ilog","Imamawo","Ipil","Laguile","Latag","Luntal","Mahabang Lodlod","Niogan","Poblacion 1","Poblacion 2","Poblacion 3","Poblacion 4","Poblacion 5","Poblacion 6","Poblacion 7","Poblacion 8","Poblacion 9","Poblacion 10","Poblacion 11","Poblacion 12","Poblacion 13","Poblacion 14","Pook ni Banal","Seiran","Tatlong Maria","Tulo","Wawa"];

const SIGHTS = [
  { name: "Basilica de San Martin de Tours", photo: "/images/basilica-san-martin.png", slot: "[ photo: basilica facade ]", desc: "The largest Catholic church in Asia, rebuilt in the 19th century on a hill above the Poblacion. The belfry may be climbed for a view of the town and Balayan Bay.", meta: "Open daily \u00b7 Poblacion" },
  { name: "Archdiocesan Shrine of Our Lady of Caysasay", photo: "/images/caysasay-shrine.png", slot: "[ photo: caysasay shrine ]", desc: "First built in 1611 and rebuilt in coral stone in 1639, on the banks of the Pansipit River. Restored by the National Museum and reopened in June 2024 as a National Cultural Treasure.", meta: "Open daily \u00b7 Brgy. Labac" },
  { name: "Ancestral houses of Calle Agoncillo", photo: "/images/calle-agoncillo-houses.png", slot: "[ photo: ancestral house ]", desc: "A continuous row of bahay-na-bato residences, several open to visitors as house museums.", meta: "Tue\u2013Sun \u00b7 Poblacion" },
  { name: "Escuela Pia", photo: "/images/escuela-pia.png", slot: "[ photo: escuela pia ]", desc: "One of the town's oldest school buildings, now a venue for civic and cultural events.", meta: "Poblacion" },
  { name: "Barong Tagalog embroidery shops", photo: "/images/barong-embroidery.png", slot: "[ photo: embroidery work ]", desc: "Workshops along the market streets where jusi and pi\u00f1a barong are still hand-embroidered.", meta: "Mon\u2013Sat \u00b7 Market district" },
  { name: "Balisong forges", photo: "/images/balisong-forge.png", slot: "[ photo: balisong forge ]", desc: "Family forges in Balisong and Pandayan producing the folding knife the barangay gave its name to.", meta: "By arrangement \u00b7 Brgy. Balisong" }
];

const TPH = "https://taal.ph/wp-content/uploads/2026/04/";
const MUSEUMS = [
  { name: "Casa Villavicencio (Casa V)", kind: "Ancestral house", photo: TPH + "casav.jpg", note: "A bahay na bato used as a secret meeting place by revolutionary leaders, with a trapdoor under the dining table leading to a hidden room." },
  { name: "Villavicencio Wedding Gift House", kind: "Ancestral house", photo: TPH + "wedding-gift-house.jpg", note: "Built in 1872 by Don Eulalio Villavicencio as a wedding gift for Gliceria Marella; known for its blue and yellow exterior and Victorian wall stencils." },
  { name: "Galleria Taal", kind: "Museum", photo: TPH + "galleria_taal.jpg", note: "The 19th-century Ilagan-Barrion house, now the country's first camera museum, with vintage cameras dating to the 1800s in working condition." },
  { name: "Do\u00f1a Marcela Agoncillo Museum", kind: "Museum", photo: TPH + "Agoncillo.jpg", note: "Ancestral home of the woman who sewed the first Philippine flag, with personal memorabilia and Revolution-era exhibits." },
  { name: "Don Leon Apacible Museum", kind: "Museum", photo: TPH + "Leon_Apacible_Museum_facade-scaled.jpg", note: "Former home of Emilio Aguinaldo's finance officer, preserving Art Deco details and 19th-century furnishings." },
  { name: "Gregorio Agoncillo Mansion (White House)", kind: "Ancestral house", photo: TPH + "549768542_2453493031718363_6688659167020268185_n.jpg", note: "An American-colonial mansion painted entirely white, with high ceilings and Edwardian furniture." },
  { name: "San Lorenzo Ruiz Steps", kind: "Landmark", photo: TPH + "DSC_7381.jpg", note: "A flight of 125 granite steps connecting the Caysasay Shrine to the town proper." },
  { name: "Sta. Lucia Well", kind: "Landmark", photo: TPH + "DSC_7364.jpg", note: "A spring-fed well near the steps, long held by locals to have healing powers and marking a 17th-century apparition." }
];

const SSD = "https://shoestringdiary.wordpress.com/wp-content/uploads/2026/01/";
const LESSER = [
  { name: "Paradores del Castillo", street: "Calle del Castillo", photo: SSD + "paradores04-ssd.jpg?w=736", note: "An early 1900s residence restored in 2014 and now run as a heritage hotel; Cucina Jardin operates inside." },
  { name: "Casa Recuerdos", street: "Calle del Castillo", photo: SSD + "casa_recuerdos02-ssd.jpg?w=736", note: "Ancestral house restored by the Villavicencios, where visitors may be photographed in colonial-era costume." },
  { name: "Casa Dela Rosa", street: "Calle Jose Diokno", photo: SSD + "casa_dela_rosa4-ssd.jpg?w=736", note: "Facing the public market, with a caf\u00e9 and a bank branch on the ground floor." },
  { name: "Casa Conchita", street: "Calle Marcela Agoncillo", photo: SSD + "casa_conchita2-ssd.jpg?w=736", note: "Ancestral home of the Alcasids, named for Do\u00f1a Conchita de las Alas Lualhati; now a bed and breakfast." },
  { name: "Villa Severina", street: "Calle Vicente Ilustre", photo: SSD + "villa_severina1-ssd.jpg?w=736", note: "Another heritage house turned bed and breakfast, a block from the public market." },
  { name: "Taal Post Office", street: "Calle Camilo Ilagan", photo: SSD + "taal_houses21-ssd.jpg?w=736", note: "Still housed inside a heritage structure along the street." },
  { name: "Cobblestone stretch of Calle Jose Diokno", street: "Calle Jose Diokno", photo: SSD + "taal_houses16-ssd.jpg?w=736", note: "A cobbled street near the Municipal Hall, closed to cars by an arched barrier; several houses keep panciterias and shops below." },
  { name: "Museo ng Burdang Kamay: Pamana ni Ka Naty", street: "Public market area", photo: SSD + "taal_weaving02-ssd.jpg?w=736", note: "A museum of Taal embroidery, among the weaving and bridal-wear shops around the market." }
];

const COUNCIL = [
  { name: "Coun. Arnulfo C. Garces", role: "Sangguniang Bayan Member" },
  { name: "Coun. Regie S. Aceron", role: "Sangguniang Bayan Member" },
  { name: "Coun. Andres Basilio A. Diokno", role: "Sangguniang Bayan Member" },
  { name: "Coun. Thomas Gabriel C. Albufera", role: "Sangguniang Bayan Member" },
  { name: "Coun. Rolando B. Correa Jr.", role: "Sangguniang Bayan Member" },
  { name: "Coun. Edenly V. Navarro", role: "Sangguniang Bayan Member" },
  { name: "Coun. Erwin M. Lascano", role: "Sangguniang Bayan Member" },
  { name: "Coun. Randy V. Baleros", role: "Sangguniang Bayan Member" }
];

const FORMS = [
  { name: "Business permit application", meta: "PDF \u00b7 2 pp" },
  { name: "Building permit checklist", meta: "PDF \u00b7 3 pp" },
  { name: "Civil registry request slip", meta: "PDF \u00b7 1 p" },
  { name: "Senior citizen ID application", meta: "PDF \u00b7 1 p" },
  { name: "Citizen feedback form", meta: "PDF \u00b7 1 p" },
  { name: "Real property tax clearance request", meta: "PDF \u00b7 1 p" }
];

export { SERVICES, NEWS, OFFICES, BARANGAYS, SIGHTS, TPH, MUSEUMS, SSD, LESSER, COUNCIL, FORMS };
