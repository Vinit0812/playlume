// B2B Wholesale Category Sourcing Guides & Trade FAQs for V&A Global Sourcing
// Written specifically for Indian retailers, resellers, distributors, and shop owners

export interface CategoryGuide {
  title: string;
  subtitle: string;
  overview: string;
  sourcingConsiderations: string[];
  retailerMargins: {
    averageMargin: string;
    turnoverVelocity: string;
    tip: string;
  };
  qualityAndPackaging: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  "toys-games": {
    title: "Wholesale Toys & Games Sourcing Guide for Indian Retailers",
    subtitle: "Direct Factory Procurement, BIS Compliance & High-Margin Turnarounds",
    overview:
      "V&A Global Sourcing operates direct factory procurement channels across major toy manufacturing clusters. We supply retail toy stores, preschool suppliers, gift shops, and online sellers across Gujarat, Maharashtra, Delhi NCR, and South India. Every toy inventory lot is curated for non-toxic materials, mechanical durability, and strict BIS safety standards to ensure rapid inventory turns and zero customer friction.",
    sourcingConsiderations: [
      "Mandatory BIS (Bureau of Indian Standards) certification verification for all plastic and electronic toys.",
      "Balanced inventory mix: 50% evergreen developmental/educational products, 30% plush & novelty impulse items, and 20% high-ticket RC/electronic vehicles.",
      "Carton integrity and master case packing to eliminate transit damage during multi-state freight haulage.",
      "Batch-tested child-safe edges, lead-free pigments, and secure screw-down battery enclosures.",
    ],
    retailerMargins: {
      averageMargin: "55% – 70%",
      turnoverVelocity: "High (15–25 day restocking cycles)",
      tip: "Educational wooden toys and LCD writing tablets yield high recurring repeat sales through preschool parent networks.",
    },
    qualityAndPackaging: [
      "Multi-ply corrugated outer master cartons with edge corner protectors.",
      "Color window presentation boxes printed in English with retail barcodes (EAN-13 ready).",
      "Factory lot sampling protocols checking drop impact, seam tear strength, and battery terminals.",
    ],
    faqs: [
      {
        question: "What is the Minimum Order Quantity (MOQ) for wholesale toys?",
        answer:
          "Our standard wholesale MOQ begins at 20 units per SKU, allowing small and medium toy shop owners to test diverse assortments with minimal working capital lockup. Volume tier discounts apply automatically at 50, 100, and 250+ units.",
      },
      {
        question: "Are your wholesale toys compliant with Indian toy safety standards (BIS)?",
        answer:
          "Yes. All plastic, battery-operated, and educational toy lines distributed by V&A Global Sourcing adhere to the Toys (Quality Control) Order mandated by the Government of India, featuring non-toxic raw plastics and verified compliance.",
      },
      {
        question: "Can we mix and match variants to meet the MOQ threshold?",
        answer:
          "Yes. Assorted color and character variants within the same product line (such as plush toys or educational boards) can be pooled together to fulfill the master case MOQ requirement.",
      },
      {
        question: "What is the typical shipping timeline to Gujarat and other states?",
        answer:
          "Consignments dispatched from our central warehouse reach Ahmedabad, Surat, and Rajkot within 24–48 hours. Inter-state dispatches to Mumbai, Delhi, Bengaluru, and Kolkata typically deliver within 3 to 5 business days via surface cargo.",
      },
    ],
  },

  "clothing-apparel": {
    title: "Wholesale Clothing & Garment Distribution Guide",
    subtitle: "Sourcing Directly from Tirupur, Surat, and Ahmedabad Textile Hubs",
    overview:
      "Garment retailing demands rigorous consistency in fabric GSM, shrinkage control, and colorfastness. V&A Global Sourcing bridges retail boutiques, departmental stores, and regional distributors with certified textile mills. Our wholesale collections span men's bio-washed combed cotton polos, premium slub linen ethnic kurtas, women's printed rayon palazzos, and skin-friendly combed cotton infant wear.",
    sourcingConsiderations: [
      "Strict GSM standards: 180–220 GSM for men's combed cotton tees and 140–160 GSM for breathable summer kurtas.",
      "Pre-shrunk fabric processing to guarantee zero post-wash sizing distortion.",
      "Standard Indian size charts (M, L, XL, XXL) calibrated for true local fit and minimal retail return rates.",
      "Seasonal production scheduling aligning with festive spikes (Diwali, Eid, Navratri, and wedding seasons).",
    ],
    retailerMargins: {
      averageMargin: "60% – 75%",
      turnoverVelocity: "High (weekly reorders on core neutrals and festive peaks)",
      tip: "Multipack displays and matching ethnic coordinate sets boost average bill value by over 40% in retail showrooms.",
    },
    qualityAndPackaging: [
      "Individual clear polypropylene garment bags with silica gel moisture absorbers.",
      "Heavy-duty corrugated export cases with inner waterproof poly liner.",
      "Pre-tagged merchandise featuring size tags, fabric composition, wash care instructions, and MRP tags.",
    ],
    faqs: [
      {
        question: "What size ratios are provided in wholesale apparel master cartons?",
        answer:
          "Standard carton assortments follow industry ratio standards: 1:2:2:1 (M:L:XL:XXL) for men's apparel, ensuring retailers receive inventory proportions that accurately mirror consumer demand.",
      },
      {
        question: "Do you supply fabric test reports for shrinkage and color bleeding?",
        answer:
          "Yes. Our apparel lines undergo standard laboratory wash tests maintaining less than 3% dimensional shrinkage and Grade 4+ dry/wet rubbing fastness.",
      },
      {
        question: "Can corporate buyers request custom embroidery or private labelling?",
        answer:
          "For commercial orders exceeding 300 pieces per design, our manufacturing division provides custom woven neck labels, hangtags, and custom embroidery.",
      },
      {
        question: "What payment terms are available for verified wholesale buyers?",
        answer:
          "First-time buyers transact via proforma invoice through NEFT/RTGS/UPI. Established distributors with a verified 6-month purchasing track record can apply for credit terms through our trade desk.",
      },
    ],
  },

  "artificial-jewellery": {
    title: "Fashion Jewellery Wholesale Procurement Strategy",
    subtitle: "High-Density Anti-Tarnish Formulations & Trend-Driven Curation",
    overview:
      "Artificial and fashion jewellery delivers the highest gross profit margins across retail accessories. V&A Global Sourcing curates high-grade brass and alloy jewellery treated with advanced electroplated gold, rhodium, and lacquer seals to resist oxidative tarnishing in humid Indian climates. From Kundan bridal choke sets to contemporary minimalist zircon earrings, our wholesale catalogue drives retail impulse sales.",
    sourcingConsiderations: [
      "Triple-layer anti-tarnish electroplating preventing skin discoloration and premature dulling.",
      "Hypoallergenic nickel-free and lead-free alloy bases to safeguard sensitive skin.",
      "Robust clasp mechanisms, reinforced jump rings, and high-tensile fishwire threading on pearl and bead work.",
      "Compact footprint with high gross margin per square foot of retail counter display.",
    ],
    retailerMargins: {
      averageMargin: "65% – 85%",
      turnoverVelocity: "Very High (impulse purchases and festive gifting spikes)",
      tip: "Countertop rotating acrylic display stands stocked with under-₹199 retail items convert over 25% of walk-in foot traffic.",
    },
    qualityAndPackaging: [
      "Velvet-lined display cards enclosed in sealed anti-scratch protective poly sleeves.",
      "Bubble-wrap layered master boxes protecting delicate stone settings and posts during transit.",
      "Barcoded SKU labeling on backing cards for instant point-of-sale scanning.",
    ],
    faqs: [
      {
        question: "How long does the anti-tarnish coating last on your jewellery?",
        answer:
          "Under standard indoor storage and regular customer wear away from direct perfume/water spray, our micro-plated collections maintain lustrous finish for 12 to 18 months.",
      },
      {
        question: "What is the minimum investment needed to start a jewellery retail counter?",
        answer:
          "With our accessible 30-piece SKU minimums and starter packs starting from ₹3,000 to ₹5,000, retailers can launch a comprehensive 20-design showcase with very low risk.",
      },
      {
        question: "Are display stands or backing cards included with wholesale orders?",
        answer:
          "Every item arrives on branded retail-ready display backing cards. Countertop acrylic display carousels are provided complimentary with qualifying orders above ₹25,000.",
      },
      {
        question: "What happens if a delicate stone is damaged during shipment?",
        answer:
          "We offer 100% transit insurance. Any piece damaged in freight is credited or replaced immediately upon submitting unboxing video verification within 48 hours.",
      },
    ],
  },

  "consumer-electronics": {
    title: "Consumer Electronics & Mobile Accessories Wholesale Guide",
    subtitle: "BIS-Certified Circuitry, Safety Shields & High-Volume Sourcing",
    overview:
      "In consumer electronics and mobile accessories, component failure destroys retail reputation. V&A Global Sourcing enforces strict component sourcing for mobile chargers, braided fast-charging data cables, Bluetooth earphones (TWS), smartwatches, and tempered screen protectors. All active electronics incorporate over-voltage protection, CE/BIS certified battery cells, and fire-retardant outer casings.",
    sourcingConsiderations: [
      "Mandatory BIS certification on lithium-ion power banks, wireless earbuds, and wall adapters.",
      "Pure copper core conductors in data cables for genuine 65W/100W PD fast charging without overheating.",
      "True Bluetooth 5.3+ chipsets with environmental noise cancellation (ENC) for stable connectivity.",
      "Defect rate thresholds strictly held below 0.8% through pre-shipment burn-in testing.",
    ],
    retailerMargins: {
      averageMargin: "45% – 60%",
      turnoverVelocity: "Extremely High (daily repeat purchases and essential replacements)",
      tip: "Bundling braided charging cables with 30W/65W GaN wall adapters increases transaction basket size by 35%.",
    },
    qualityAndPackaging: [
      "Tamper-evident retail boxes with UV spot varnishing and metallic foil stamping.",
      "Molded EVA interior cradles preventing internal movement and terminal bending.",
      "Multi-lingual instruction manuals with certified warranty documentation cards.",
    ],
    faqs: [
      {
        question: "What warranty coverage is extended on wholesale electronic items?",
        answer:
          "All active electronic items come with a 6-month commercial replacement warranty against manufacturing defects, handled directly through our central warranty support desk.",
      },
      {
        question: "Are your power accessories compatible with latest Android and iOS models?",
        answer:
          "Yes. Our chargers and cables utilize universal USB Type-C and Power Delivery (PD) protocols, supporting Quick Charge 3.0/4.0 and 65W+ fast-charging standards.",
      },
      {
        question: "How do you ensure battery longevity during extended warehouse storage?",
        answer:
          "All battery-powered SKUs are stored at 60% optimal storage charge in climate-managed dry warehousing with strict FIFO (First-In, First-Out) inventory rotation.",
      },
      {
        question: "Can we get custom branded retail packaging for bulk electronics orders?",
        answer:
          "OEM custom branding and white-label packaging are supported for bulk commercial contracts starting at 500 units per model.",
      },
    ],
  },

  "home-kitchen": {
    title: "Wholesale Home & Kitchen Utilities Procurement Blueprint",
    subtitle: "Food-Grade Polymers, Stainless Steel & Ergonomic Everyday Essentials",
    overview:
      "Every Indian household demands rugged, food-safe kitchenware that withstands heavy daily usage. V&A Global Sourcing delivers heavy-duty manual vegetable choppers, leak-proof stainless steel lunch containers, vacuum-insulated thermosteel bottles, and modular pantry organizers. Direct factory sourcing from Rajkot, Ahmedabad, and international tooling centers ensures unmatched value for wholesale distributors.",
    sourcingConsiderations: [
      "100% BPA-free virgin food-grade plastics and SS304/SS201 surgical-grade stainless steel fabrication.",
      "Reinforced mechanical parts: Japanese 420-grade stainless steel blades and high-tensile nylon pull cords.",
      "Airtight silicone gaskets and leak-proof snap locks tested under dynamic transport pressure.",
      "High perceived utility that translates effortlessly into viral social media and retail storefront sales.",
    ],
    retailerMargins: {
      averageMargin: "50% – 65%",
      turnoverVelocity: "Consistent Year-Round (spikes during housewarming and festive seasons)",
      tip: "Live in-store demonstrations of vegetable choppers or airtight containers double conversion rates for walk-in shoppers.",
    },
    qualityAndPackaging: [
      "Color gift boxes with high-resolution usage diagrams and recipe inspiration cards.",
      "Internal cardboard separators and bubble sleeves preventing dents on stainless steel surfaces.",
      "Heavy 7-ply outer export cartons engineered to endure rough regional logistics handling.",
    ],
    faqs: [
      {
        question: "Are the plastics used in kitchenware certified food-safe and BPA-free?",
        answer:
          "Yes. All food-contact containers, lunch boxes, and prep tools are manufactured using 100% virgin food-grade polypropylene (PP) and Eastman Tritan, certified free from BPA, phthalates, and harmful heavy metals.",
      },
      {
        question: "Can replacement blades or pull strings be ordered separately for choppers?",
        answer:
          "We maintain a comprehensive spare parts inventory. Retailers can order replacement blade cartridges, pull-lids, and silicone seals directly for customer servicing.",
      },
      {
        question: "What is the packing quantity in a master carton for kitchen choppers?",
        answer:
          "Standard vegetable choppers are packed in master cases of 24 or 36 pieces, with individual color gift boxes ready for immediate retail shelf placement.",
      },
      {
        question: "Do you supply hotel, restaurant, and catering (HoReCa) institutional clients?",
        answer:
          "Yes. We supply institutional dining sets, bulk storage containers, and commercial prep tools with custom GST billing and road transport logistics across India.",
      },
    ],
  },

  "fashion-accessories": {
    title: "B2B Fashion Accessories Wholesale Sourcing & Trends",
    subtitle: "Vegan Leather Handbags, Wallets, Hair Essentials & Eyewear",
    overview:
      "Fashion accessories offer agile inventory flexibility, low weight freight advantages, and strong impulsive retail buying behavior. V&A Global Sourcing partners with premier leatherette artisans and accessories fabricators to supply chic crossbody sling bags, executive bi-fold wallets, silk-feel satin hair scrunchies, and UV400 polarized eyewear. Every piece delivers luxury presentation at genuine wholesale prices.",
    sourcingConsiderations: [
      "Premium PU vegan leather that resists flaking, cracking, and water staining under humid conditions.",
      "Heavy-duty metal hardware: smooth-gliding zippers, zinc-alloy swivel clasps, and reinforced rivet joints.",
      "UV400 category 3 optical protection lenses on sunglasses tested for 100% UVA/UVB blockage.",
      "Agile seasonal refreshes keeping your store stocked with viral social media trends.",
    ],
    retailerMargins: {
      averageMargin: "60% – 75%",
      turnoverVelocity: "High (strong cross-merchandising potential with clothing and cosmetics)",
      tip: "Placing coordinating hair accessory packs and mini wallets near billing counters increases impulse add-ons by up to 30%.",
    },
    qualityAndPackaging: [
      "Dust-proof non-woven protective bags for all handbags and wallets.",
      "Reinforced cardboard stuffing and desiccants maintaining silhouette integrity during shipping.",
      "Individual barcoded transparent blister packs for sunglasses and hair accessories.",
    ],
    faqs: [
      {
        question: "Are the handbags and wallets made of genuine leather or PU vegan leather?",
        answer:
          "Our core line is crafted from high-grade multi-layer PU vegan leather, offering superior weather resistance, easy wipe-clean maintenance, and cruelty-free consumer appeal at a fraction of genuine leather costs.",
      },
      {
        question: "What UV protection rating do your wholesale sunglasses feature?",
        answer:
          "All wholesale sunglasses carry UV400 certification, blocking 99.9% of harmful UVA and UVB radiation, with select polarized variants available for driving and outdoor lifestyle.",
      },
      {
        question: "Can we mix multiple styles within a single master shipping carton?",
        answer:
          "Yes. We offer curated variety cartons containing 5 to 10 distinct handbag or wallet styles in equal ratios so boutique retailers can test customer preferences without over-investing.",
      },
      {
        question: "What are the payment and shipping terms for boutique owners?",
        answer:
          "Orders are dispatched within 24 hours of proforma settlement. Tracking details from trusted express surface carriers (Bluedart, Delhivery, V-Trans) are provided via WhatsApp and email.",
      },
    ],
  },
};
