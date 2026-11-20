---
title: 'The SSO Tax: When Better Security Comes with a Steep Price'
summary: 'The “SSO tax” is a hidden cost many businesses face when trying to implement secure authentication practices.'
category: 'Auth'
datePublished: 2025-01-03
author: 'Wristband Team'
coverImage: '/images/misc/677b279da40b89e5879e5560_677b2780046e98b547549215_sso-tax-pricing.png'
---

The “SSO tax” is a hidden cost many businesses face when implementing secure authentication practices. Despite being a critical tool for improving security and streamlining user management, Single Sign-On (SSO) is often locked behind prohibitively expensive pricing tiers, making it inaccessible to many organizations. This article explores why SSO is essential, how the SSO tax impacts businesses, and what is being done to tackle the problem.

‍

### What Is Single Sign-On (SSO)?

Single Sign-On (SSO) is a system that allows you to log in once and access multiple applications without needing to re-enter your credentials every time. Instead of juggling a different username and password for each app, you authenticate just once through a centralized identity provider (IdP) like Google, Microsoft, or Okta. From there, you’re automatically signed in to other connected apps — no extra passwords required. SSO is widely used in professional settings to allow employees of a company to log into work-related applications using their company identity. For example, when employees log in to workplace tools such as Slack, Google Drive, or Salesforce, they will log in through their company’s IdP (such as Okta) instead of using their personal credentials.

SSO relies on underlying technologies like OpenID Connect (OIDC) and SAML to securely exchange authentication data between the identity provider and applications. These protocols handle the "handshake" that verifies users and grants them access without needing to share passwords directly.

There are two main ways end users access their SSO-enabled apps:

- Service Provider-Initiated Flow (SP-Initiated):This is when the user starts at the login page of the application (Service Provider, or SP) and clicks a "Login with SSO" button. This redirects them to the Identity Provider (IdP) like Okta or Microsoft to authenticate. Once verified, they’re sent back to the app, now securely logged in.
  ![](/images/misc/677b1e023c3b9cb10c6cffa3_677b1decdc3715c48137918d_fakesaas-login.png)User starts the "SP-Initiated" SSO login flow from the SaaS vendor's login page.- Identity Provider-Initiated Flow (IdP-Initiated):The user logs in directly to the IdP’s dashboard, which serves as a central hub for all their SSO-enabled apps. From there, they simply click the app they want (e.g., Slack), and the IdP seamlessly logs them in without requiring additional credentials.
  ![](/images/misc/677b20f4dc3715c481396390_677b20e71a7b90bbbe8db573_iam-apps-dashboard.png)User starts the "IdP-Initiated" SSO login flow from the IdP’s dashboard.

‍

### Why SSO is Important

For users, SSO means they only need to log in once to access all their work-related applications, reducing frustration and increasing productivity.

For organizations, SSO saves time and reduces costs associated with onboarding and offboarding employees since access to all apps can be granted or revoked through a central location. In addition, SSO strengthens an organization's security posture by enforcing secure authentication standards across all applications and provides clear audit trails of user log-ins.

‍

### What is the SSO Tax?

The "SSO tax" refers to the extra fees that SaaS providers charge their customers to enable Single Sign-On (SSO). To demonstrate the SSO tax, consider the following pricing table for a fictional SaaS vendor called FakeSaaS:

![](/images/misc/677b279da40b89e5879e5560_677b2780046e98b547549215_sso-tax-pricing.png)A fictional example of pricing plans that charge users an "SSO Tax".

‍

In this scenario, SSO is locked behind the Enterprise plan, drastically increasing the costs a customer would have to pay for a FakeSaaS subscription. To illustrate these cost differences, let’s consider a customer needing FakeSaaS for ten users: they’d pay $100/month on the Basic plan, $200/month on the Pro plan, but a much higher $800/month on the Enterprise plan just to enable SSO. While the Enterprise plan may also come with additional features, oftentimes those features are nice to have, whereas SSO is required.

Companies that implement an SSO tax usually do so for the following reasons:

- To Cover Operational Costs: Integrating and maintaining SSO for different customers can require significant engineering effort and support infrastructure. Charging extra for SSO helps offset these costs.‍
- To Optimize Revenue Gains From Enterprise Customers: Most enterprise companies need SSO to meet security and compliance requirements. Therefore, having SSO as a feature in the enterprise tier forces enterprise customers to upgrade to the most expensive plans. This allows companies to extract optimal revenue from their enterprise customers.

While it’s true that implementing SSO can be a difficult task, over time the process can be automated such that the cost of enabling SSO on a per customer basis is negligible. At this point, charging extra for SSO is purely for profit gains.

‍

### Problems with the SSO Tax

By charging an SSO Tax, vendors create a significant barrier for organizations to properly secure their workforce identities. As a result, many businesses are not able to adopt SSO and instead rely on proliferating employee credentials across their internal applications. As companies scale up, managing accounts for each employee across numerous applications becomes a maintenance nightmare. Also, the sprawl of passwords increases the attack surface for password-related breaches. According to Verizon's [2024 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/2024-dbir-data-breach-investigations-report.pdf), roughly 80% of web application attacks are due to stolen passwords.

Making matters worse, companies continue to increase their usage of SaaS applications. According to BetterCloud's [State of SaaSOps 2024 Report](https://www.bettercloud.com/resources/state-of-saasops/), organizations now use an average of 112 SaaS applications. Paying the SSO tax for such a large number of applications becomes challenging even for larger companies. As such, companies typically only choose a subset of applications to utilize SSO - leaving a significant set of applications without SSO. This dramatically weakens a company’s security posture, as each app without SSO becomes a potential weak point for password-based breaches.
![](/images/misc/67788ed86eedf50292b88a27_67788eab8f023e7f827784c2_screenshot-202025-01-03-20at-205.22.45-e2-80-afpm.png)The average number of SaaS applications at companies over time. [_Source: BetterCloud_]

‍

### Call to Action for SaaS Vendors

The “security poverty line,” a term introduced by [Wendy Nather in 2013](https://www.infosecuritymagazine.nl/files/2fb0642808f57f0f9831532ae8f7e8fd.pdf), reflects the gap between those who can afford strong security measures and those who cannot. In recent years, there’s been a growing advocacy to reverse the SSO tax trend and lift all businesses above the security poverty line.

Rob Chahin created the [SSO Wall of Shame](https://sso.tax/) to help call attention to this matter. The idea is to raise awareness about the "SSO tax" by publicly calling out SaaS vendors that treat single sign-on as a luxury rather than a core security feature. It aims to pressure these companies into making SSO accessible, driving industry-wide change toward more secure and equitable solutions.

As part of its ongoing efforts to address cybersecurity challenges, the Cybersecurity and Infrastructure Security Agency (CISA) has released several resources and reports in an effort to help reduce vulnerabilities, prevent costly fixes, and bolster national security. One such initiative is the [Secure by Design](https://www.cisa.gov/securebydesign) campaign, which advocates for technology providers to prioritize security from the outset of product development. The campaign calls on executive leadership in technology companies to take ownership of security at all levels, ensuring that features like SSO are built in by default.

‍

### The Role of 3rd-Party Auth Providers in the SSO Tax

Many modern applications rely on third-party authentication providers to handle their identity and access management needs, including SSO functionality. Unfortunately, these providers often impose additional fees for each SSO connection, creating a ripple effect. SaaS vendors using these auth platforms are forced to absorb these costs, which they then pass on to their own customers by locking SSO behind higher-priced tiers. This practice perpetuates the SSO tax, making essential security features less accessible to organizations.

Wristband is actively working to eliminate the SSO tax by democratizing the development and maintenance of secure SSO connections. Our platform enables SaaS vendors to offer single sign-on functionality as a standard feature rather than an expensive add-on, making it accessible to businesses of all sizes.
![](/images/misc/67766220f7131972a5d32087_677661e2eebc4d3d387a7c0e_read-my-lips.jpeg)Wristband is committed to helping the fight against the SSO Tax.

By providing an easy-to-integrate solution to everyone, we help vendors streamline their security practices while reducing costs for their customers. Our approach is designed to level the playing field, ensuring that small and medium-sized businesses (SMBs) no longer face a financial barrier to implementing essential security measures like SSO, which are crucial for safeguarding their data and user identities.

‍

### Wrap-Up

The SSO tax highlights a critical gap in cybersecurity accessibility, disproportionately affecting organizations with limited resources. By treating SSO as a fundamental security necessity rather than a luxury, the industry has an opportunity to break down barriers to secure authentication. As SaaS vendors, developers, and third-party auth providers align toward more equitable practices, the path to stronger, scalable security becomes clearer. Wristband stands at the forefront of this movement, committed to eliminating the SSO tax and empowering businesses of all sizes to prioritize security without compromising affordability. Together, we can create a more secure digital landscape where robust identity management is accessible to everyone, fostering innovation and trust across industries.

‍

If you want to learn more about how Wristband can help please reach out to [info@wristband.dev](mailto:info@wristband.dev) or grab time [here](/request-demo).
[![](/images/misc/663bc0b036a866af2914be89_jim.png)](/the-team)[Jim VerducciCEO / Co-founder](/the-team)[](https://www.linkedin.com/in/jim-verducci/)
