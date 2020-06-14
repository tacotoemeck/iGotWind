// https://www.wannasurf.com/spot/Europe/UK/Cornwall_South/index.html

const locations = [
  {
    name: "The Bill",
    latitude: "50.512444",
    longitude: "-2.458191",
  },
  {
    name: "Beer Point",
    latitude: "50.685474",
    longitude: "-3.095398",
  },
  {
    name: "BoneYard Exmouth",
    latitude: "50.608667",
    longitude: "-3.36997",
  },
  {
    name: "Preston Beach",
    latitude: "50.443643",
    longitude: "-3.556212",
  },
  {
    name: "Thurlsestone",
    latitude: "50.266706",
    longitude: "-3.870546",
  },
  {
    name: "Bantham Rivermouth",
    latitude: "50.278014",
    longitude: "-3.886929",
  },
  {
    name: "Challabrough",
    latitude: "50.288462",
    longitude: "-3.898773",
  },
  {
    name: "Mothecombe",
    latitude: "50.309269",
    longitude: "-3.952761",
  },
  {
    name: "Whitsand Bay",
    latitude: "50.354169",
    longitude: "-4.278359",
  },
  {
    name: "Seaton",
    latitude: "50.364217",
    longitude: "-4.387493",
  },
  {
    name: "Falmouth Beaches Gylly Swanpool Maenporth",
    latitude: "50.140228",
    longitude: "-5.076199",
  },
  {
    name: "Kennack Sands",
    latitude: "50.005011",
    longitude: "-5.161493",
  },
  {
    name: "Porthleven",
    latitude: "50.082005",
    longitude: "-5.321234",
  },
  {
    name: "Praa sands",
    latitude: "50.101795",
    longitude: "-5.388225",
  },
  {
    name: "Mousehole Reef",
    latitude: "50.081221",
    longitude: "-5.537876",
  },
  {
    name: "Porthcurno and Logan Rock",
    latitude: "50.042809",
    longitude: "-5.650063",
  },
  {
    name: "Sennen",
    latitude: "50.082673",
    longitude: "-5.698514",
  },
  {
    name: "Porthmeor",
    latitude: "50.215868",
    longitude: "-5.482693",
  },
  {
    name: "Breakwater",
    latitude: "50.215597",
    longitude: "-5.475457",
  },
  {
    name: "St Ives harbour wall",
    latitude: "50.211405",
    longitude: "-5.475912",
  },
  {
    name: "Carbis Bay",
    latitude: "50.19877",
    longitude: "-5.461192",
  },
  {
    name: "Hayle Rivermouth",
    latitude: "50.200708",
    longitude: "-5.427868",
  },
  {
    name: "Gwithian",
    latitude: "50.234469",
    longitude: "-5.398407",
  },
  {
    name: "Portreath",
    latitude: "50.261254",
    longitude: "-5.28923",
  },
  {
    name: "Porthtowan",
    latitude: "50.284966",
    longitude: "-5.246894",
  },
  {
    name: "Chapel Porth",
    latitude: "50.300525",
    longitude: "-5.235329",
  },
  {
    name: "St Agnes",
    latitude: "50.321244",
    longitude: "-5.201082",
  },
  {
    name: "Droskyn Perranporth",
    latitude: "50.35028",
    longitude: "-5.157351",
  },
  {
    name: "Penhale",
    latitude: "50.393924",
    longitude: "-5.143125",
  },
  {
    name: "Crantock",
    latitude: "50.408518",
    longitude: "-5.12495",
  },
  {
    name: "Zorbas Reef",
    latitude: "50.414083",
    longitude: "-5.118835",
  },
  {
    name: "Fistral",
    latitude: "50.417378",
    longitude: "-5.101991",
  },
  {
    name: "The Cribber",
    latitude: "50.425745",
    longitude: "-5.103579",
  },
  {
    name: "Towan",
    latitude: "50.415943",
    longitude: "-5.084739",
  },
  {
    name: "Great Western",
    latitude: "50.415881",
    longitude: "-5.076714",
  },
  {
    name: "Tolcarne The Wedge",
    latitude: "50.418147",
    longitude: "-5.073822",
  },
  {
    name: "Lusty Glaze",
    latitude: "50.422016",
    longitude: "-5.063989",
  },
  {
    name: "Porth Beach",
    latitude: "50.425349",
    longitude: "-5.062551",
  },
  {
    name: "Whipsiderry",
    latitude: "50.431377",
    longitude: "-5.053453",
  },
  {
    name: "Watergate Bay",
    latitude: "50.44559",
    longitude: "-5.043411",
  },
  {
    name: "Mawgan Porth",
    latitude: "50.465577",
    longitude: "-5.031996",
  },
  {
    name: "Treyarnon",
    latitude: "50.526033",
    longitude: "-5.023155",
  },
  {
    name: "Boobies",
    latitude: "50.536126",
    longitude: "-5.024185",
  },
  {
    name: "Mother Ivey's spot M",
    latitude: "50.545454",
    longitude: "-5.018177",
  },
  {
    name: "Harlyn",
    latitude: "50.538745",
    longitude: "-4.997578",
  },
  {
    name: "Trevone",
    latitude: "50.543545",
    longitude: "-4.97921",
  },
  {
    name: "Daymer Point",
    latitude: "50.559933",
    longitude: "-4.925995",
  },
  {
    name: "Death Bay",
    latitude: "50.572281",
    longitude: "-4.924345",
  },
  {
    name: "Polzeath",
    latitude: "50.575088",
    longitude: "-4.916768",
  },
  {
    name: "Lundy Bay",
    latitude: "50.583046",
    longitude: "-4.884925",
  },
  {
    name: "Trebarwith Strand",
    latitude: "50.645787",
    longitude: "-4.764687",
  },
  {
    name: "Crackington Haven",
    latitude: "50.741615",
    longitude: "-4.633913",
  },
  {
    name: "Milbrook",
    latitude: "50.77152",
    longitude: "-4.582651",
  },
  {
    name: "Widemouth Bay",
    latitude: "50.790935",
    longitude: "-4.560013",
  },
  {
    name: "Crooklets",
    latitude: "50.835785",
    longitude: "-4.555206",
  },
  {
    name: "Noahs right",
    latitude: "50.938216",
    longitude: "-4.548168",
  },
  {
    name: "Buck s Mill",
    latitude: "50.989651",
    longitude: "-4.34638",
  },
  {
    name: "Westward Ho",
    latitude: "51.045819",
    longitude: "-4.231796",
  },
  {
    name: "Saunton Sands",
    latitude: "51.109773",
    longitude: "-4.22699",
  },
  {
    name: "Down End Point",
    latitude: "51.125075",
    longitude: "-4.245701",
  },
  {
    name: "Croyde",
    latitude: "51.128603",
    longitude: "-4.244113",
  },
  {
    name: "Boneyards",
    latitude: "51.131754",
    longitude: "-4.241753",
  },
  {
    name: "Putsborough Beach",
    latitude: "51.143979",
    longitude: "-4.220982",
  },
  {
    name: "Woolacombe bay",
    latitude: "51.169469",
    longitude: "-4.216089",
  },
  {
    name: "Coombesgate Beach",
    latitude: "51.177621",
    longitude: "-4.216862",
  },
  {
    name: "Wild pear beach",
    latitude: "51.211723",
    longitude: "-4.034278",
  },
  {
    name: "Lynmouth",
    latitude: "51.231785",
    longitude: "-3.831031",
  },
  {
    name: "Porlock Weir Somerset",
    latitude: "51.219824",
    longitude: "-3.626312",
  },
];

export default locations;
