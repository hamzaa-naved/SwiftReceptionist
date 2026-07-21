export interface DemoLead {
  slug: string;
  business: string;
  owner: string;
  city: string;
  hook: string;
  focus: string;
  agentId: string;
}

export const demoLeads: DemoLead[] = [
  { slug: "high-tyde-electric-llc", business: "High Tyde Electric LLC", owner: "Ackine Hamilton", city: "Miramar", hook: "", focus: "Both", agentId: "agent_ead60d766138356a198d519a89" },
  { slug: "electric-bull", business: "Electric Bull", owner: "Dayan Suarez", city: "Miami", hook: "", focus: "Both", agentId: "agent_b849abd8a77abb76681ab00322" },
  { slug: "rizo-electric-inc", business: "Rizo Electric Inc", owner: "Sergio Varela", city: "Miami", hook: "", focus: "Both", agentId: "agent_63fc54725a0561243ae7c80c49" },
  { slug: "ace-electricians", business: "Ace Electricians", owner: "Aleksandr Blinov", city: "Miami", hook: "does EV chargers, panel upgrades, smart home", focus: "Commercial", agentId: "agent_9c875680ad3fd60a8a18657481" },
  { slug: "sds-electrical-handyman-services-llc", business: "SDS Electrical & Handyman Services LLC", owner: "Anibal Marrero", city: "Gainesville", hook: "", focus: "Residential", agentId: "agent_882003f2b722167a489375d78c" },
  { slug: "cardona-electrical-service-llc", business: "Cardona Electrical Service LLC", owner: "Emmanuel Cardona", city: "Miramar", hook: "10+ years in business", focus: "Both", agentId: "agent_7511a6e6c9b8416e93b62d194a" },
  { slug: "y-m-electrical-contractor-inc", business: "Y&M Electrical Contractor Inc.", owner: "Yosdany Mena", city: "", hook: "advertises 24/7 emergency; does generators", focus: "Both", agentId: "agent_e47655c08ff618e7538b415e1b" },
  { slug: "del-sol-electric-llc", business: "Del Sol Electric, LLC", owner: "Wigberto Baez", city: "Gainesville", hook: "8+ years in business; advertises 24/7 emergency; does generators, panel upgrades", focus: "Commercial", agentId: "agent_c6cd31b6b6ac57d04b9c35e4a8" },
  { slug: "j-d-electrical-solutions-corp", business: "J & D Electrical Solutions Corp.", owner: "Jadiel Hernandez", city: "West Palm Beach", hook: "does panel upgrades; family-owned", focus: "Both", agentId: "agent_5581ab3ca691a649e7be5ae9dc" },
  { slug: "bob-scott-light-power-sign", business: "Bob Scott Light, Power, Sign", owner: "Bob Scott", city: "Hollywood", hook: "in business since 1973", focus: "Commercial", agentId: "agent_c5f0d5ff863ddf22316450a9b7" },
  { slug: "cerrito-electric", business: "Cerrito Electric", owner: "Rosanne Cerrito", city: "West Palm Beach", hook: "does generators; family-owned; since 1990", focus: "Both", agentId: "agent_59852313b62106d37ea64bf521" },
  { slug: "triple-a-electrical-services-inc", business: "TRIPLE A ELECTRICAL SERVICES INC", owner: "Andres Agudelo", city: "", hook: "does EV chargers, panel upgrades", focus: "Commercial", agentId: "agent_13501a615d61cbeacad8f1d33c" },
  { slug: "eccentric-energy-electrical-contractor", business: "Eccentric Energy Electrical Contractor", owner: "Isaiah Flowers", city: "West Palm Beach", hook: "family-owned since 2023", focus: "Both", agentId: "agent_03f5cc398469d12ee120c269fb" },
  { slug: "honesty-handymen-llc", business: "Honesty Handymen LLC", owner: "", city: "West Palm Beach", hook: "", focus: "", agentId: "agent_d1f3bc70c0edda1991d576bd63" },
  { slug: "h-h-signature-renovations", business: "H&H Signature Renovations", owner: "Deepika Kathroju", city: "Lake Worth Beach", hook: "", focus: "Residential", agentId: "agent_f36226c0b672a17bd2b0b3f515" },
  { slug: "delta-electric-llc", business: "Delta Electric, LLC", owner: "Frank Everton", city: "", hook: "20+ years in business; does EV chargers, panel upgrades", focus: "Both", agentId: "agent_4bbae7166a9a96189425149773" },
  { slug: "alford-s-affordable-services", business: "Alford's Affordable Services", owner: "Stephen Alford", city: "Gainesville", hook: "30+ years in business; advertises 24/7 emergency", focus: "Commercial", agentId: "agent_b4c9459f2c47b5b9499bbc927a" },
  { slug: "extreme-electrical-inc", business: "Extreme Electrical Inc", owner: "Kevin Jones", city: "Lake Worth Beach", hook: "advertises 24/7 emergency", focus: "Both", agentId: "agent_91ce0c3a945a4cfa3399b82a86" },
  { slug: "bradford-electrical-services", business: "Bradford Electrical Services", owner: "", city: "Jupiter", hook: "family-owned", focus: "Commercial", agentId: "agent_4ee9f845100660b068cab86d74" },
  { slug: "teel-electric-company-llc", business: "Teel Electric Company LLC", owner: "Richard Teel", city: "Jupiter", hook: "", focus: "Residential", agentId: "agent_35430b145cbe9cd49c88869cad" },
];

export function getDemoLead(slug: string): DemoLead | undefined {
  return demoLeads.find((lead) => lead.slug === slug);
}
