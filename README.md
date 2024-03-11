# Foresta Front-end Application

![Foresta](media/foresta-ui-banner.png)

**A cutting-edge platform for carbon credit issuance, trading, and management, leveraging blockchain technology.**

🌐 Visit us at [Foresta Network](https://www.foresta.network)  
🐦 Follow us on [Twitter](https://twitter.com/Foresta) for the latest updates  
💬 Join our [Discord server](https://discord.com/invite/) to engage with the community  

## Overview

The Foresta front-end application, built with [Next.js](https://nextjs.org/), is designed for seamless interaction with the Foresta blockchain backend, providing a comprehensive platform for KYC verification, project proposal submission, carbon credit minting, and a decentralized exchange (DEX) for carbon credit trading. Leveraging modern web technologies, this application offers a robust, user-friendly experience for sustainable environmental impact through blockchain technology.

### Innovative Aspects

The most innovative aspect of our code is the creation of pallet `foresta-collectives`, a groundbreaking feature that opens the door of international carbon credit markets to communities. This facilitates governance and transparency in community-based natural resource management, aligning with the focus outlined by Charles R. Menzies. As Menzies states, "Community-based management is not a panacea, but it is a critical dimension of sustainable resource management." Our approach underscores the significance of collective action in overcoming critiques of carbon credit markets, especially in emerging markets, bridging the gap between greenwashing and communities to create real, tangible environmental impact.

### Revolutionizing Resource Management with Blockchain

One of the cornerstone innovations of our platform is the development of the `foresta-collectives` pallet. This feature is not just an advancement; it's a transformational shift in how communities interact with and benefit from international carbon credit markets. By leveraging blockchain technology, we're introducing a paradigm of governance and transparency previously unseen in community-based natural resource management (CBNRM).

#### Why Community-Based Management?

Community-based management represents a profound understanding of sustainability — that those who live with the resources, who breathe the air and drink the water of their locale, are its most natural stewards. Charles R. Menzies highlights this, emphasizing that while community management is not a universal remedy, it is a foundational element of enduring resource sustainability. The principle is simple: sustainability thrives on stewardship, and stewardship thrives on community.

#### The Blockchain Difference

Blockchain technology offers a unique set of tools to actualize the vision of CBNRM. Through the immutable, transparent, and decentralized nature of blockchain, `foresta-collectives` enables communities to:

- **Governance:** 🗳️ - Represents the active participation and democratic decision-making in community governance.
- **Transparency:** 🔍 - Symbolizes the clear visibility into the creation, trade, and retirement of carbon credits, ensuring authenticity and fraud prevention.
- **Empowerment:** 💪 - Illustrates the strengthening of communities through direct access to international markets, fostering economic benefits from conservation.
- **Bridging Gaps and Creating Impact:** 🌉 - Depicts the connection and impactful change between communities and carbon markets through transparency, accountability, and shared governance.

This approach does more than mitigate the critiques of carbon credit markets; it reimagines them. It transforms carbon credits from abstract financial instruments into tangible representations of community-led conservation. In doing so, we're laying the groundwork for a future where environmental impact and community empowerment are intrinsically linked, driven by the groundbreaking potential of blockchain technology.

#### A New Era of Environmental Stewardship

With `foresta-collectives`, we're not just developing a platform; we're championing a movement towards more equitable, sustainable, and community-focused environmental stewardship. This innovation marks the beginning of a new era in natural resource management — one where communities are at the forefront, empowered by the clarity, fairness, and global reach of blockchain technology.

### Development Timeline

We plan to complete the UI for this project in the next two month's as the runtime is quite extensive and powerful, continuously refining both the UI and node code to enhance functionality and user experience. Our next steps include integrating satellite GIS data with our off-chain workers, already implemented in the node, to leverage real-time environmental data for enhanced carbon credit management and verification.

### Features

- **KYC Verification:** Secure user authentication and verification process.
- **Project Management:** Submit and manage carbon credit projects.
- **Carbon Credit Minting:** Interface for authorized users to mint carbon credits.
- **DEX:** Platform for trading carbon credits, ensuring liquidity and accessibility.
- **Responsive UI:** Crafted for a seamless experience across all devices.

### Built With

- Next.js 14
- TailwindCSS for styling
- Polkadot.js API for blockchain interactions
- shadcn/ui components for an accessible and clean component library
- Framer Motion for animations
- Several other utilities and hooks for enhanced functionality

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

   ```bash
   
   git clone https://github.com/your-username/foresta-frontend.git
   cd foresta-frontend
    ```

## Scripts

- `dev`: Runs the app in development mode.
- `build`: Builds the app for production.
- `start`: Starts the production server.
- `lint`: Runs the linter for code quality checks.

## Architecture

The front-end interacts with the [Foresta Node](https://github.com/tcxcx/tanssi-foresta), embracing Substrate-based blockchain technology to manage an array of features including KYC, carbon credits, collectives, pools, and the DEX. This architecture simplifies the journey for users, from KYC submission through to carbon credit trading, making sustainability efforts more accessible and impactful.

### User Journeys

- **KYC Submission:** Users start by submitting their KYC for verification.
- **Project Proposal:** Post-KYC approval, users can submit project proposals for carbon credit issuance.
- **Carbon Credit Minting and Trading:** Approved projects can mint carbon credits, which can then be listed on the DEX for trading in Pools per carbon registry.

### Key Components

- **Admin Panel:** For KYC and project approvals.
- **User Dashboard:** For submitting KYC, managing projects, and trading carbon credits.
- **DEX Interface:** For listing and buying carbon credits.

## Future Directions

As we look to the future, our focus is on refining and expanding our platform's capabilities. The integration of satellite GIS data into our off-chain workers represents a significant step forward, enabling us to leverage cutting-edge technology for environmental monitoring and the verification of carbon credit projects. This approach not only enhances the reliability of our platform but also aligns with our commitment to providing verifiable, impactful solutions for carbon credit management and sustainability efforts.

As we lay the groundwork with our base MVP platform and node, our ambition doesn't stop here. The next significant phase of development involves integrating satellite GIS data with our off-chain workers. This integration aims to leverage state-of-the-art technology for meticulous environmental monitoring and the rigorous verification of carbon credit projects. Beyond verification, this GIS data will play a crucial role in implementing slashing/reward mechanisms to foster real conservation actions over time.

### AI/ML Data Lake for Conservation

Our vision extends into creating an AI/ML data lake where GIS data can be analyzed and interpreted to drive concrete conservation efforts. This innovation will allow data and climate scientists to open-source their algorithms and models, contributing to real climate impact driven by financial incentives. Such a mechanism ensures that conservation actions are not just recorded but rewarded, creating a virtuous cycle of positive environmental impact.

### Inspiration

The inspiration for our forward-looking vision comes from Kim Stanley Robinson's "The Ministry of the Future," a compelling narrative that explores how global cooperation and technological innovation can combat climate change through regenerative economics. The book paints a vivid picture of a future where humanity's ingenuity and collective will are mobilized to save our planet. It has been a beacon for our project, guiding our efforts to blend blockchain technology, satellite data, and AI/ML in the service of Earth's ecosystem.

Our commitment is to develop a platform that not only addresses the current challenges in the carbon credit market but also paves the way for a sustainable future. By aligning our technology with real-world conservation needs and the visionary ideas we aim to create a world where financial systems and environmental stewardship go hand in hand, fostering real change and impact.

## Acknowledgments

We owe a debt of gratitude to several organizations and communities for their support and inspiration:

- **[Encode Club](https://www.encode.club/):** We extend our heartfelt thanks to Encode Club for organizing the hackathon that sparked the inception of our project. Their comprehensive workshops provided invaluable insights and learning opportunities. Notably, we attended all the workshops offered, which were instrumental in shaping our approach. A special mention goes to the workshop on SIWS (Substrate-based signing) by Talisman, which we have incorporated into our platform. These sessions were pivotal in enhancing our understanding and application of cutting-edge blockchain technologies.

- **[Tanssi](https://github.com/tcxcx/tanssi-foresta):** Our project leverages the cutting-edge Polkadot runtime technology envisioned by the Tanssi team. Their framework has been instrumental in enabling us to build a decentralized platform that supports our vision for a sustainable and carbon-neutral future.

- **[Bitgreen](https://www.bitgreen.org/):** We have forked and integrated Bitgreen's Web3 Foundation MIT licensed code, which represents a significant advancement in applying blockchain technology for environmental sustainability. Bitgreen's commitment to using blockchain for positive environmental impact aligns with our core mission and has been crucial in developing our carbon credit issuance and trading platform.

Special thanks to both these projects and their communities for their open-source contributions, which have enabled us to patch their technologies together using the Dietner tool. This fusion has allowed us to bring Bitgreen's sustainability-focused blockchain solutions together with the latest Polkadot runtime technology, providing a robust foundation for the Foresta Node.

We are deeply grateful for the work of these projects and their contributions to the blockchain and sustainability ecosystems. Their innovative approaches and commitment to open-source principles have been invaluable to our project's development.

- Thanks to the Substrate and Polkadot communities for their invaluable resources and support including Web3 foundation grants and other hackathon projects that served as reference.

- Special thanks to the contributors and maintainers of the libraries and tools we use.
