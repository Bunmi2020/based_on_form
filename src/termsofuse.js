import React, { useEffect, useState } from 'react';
import './about.css';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
function TermsOfUse () {

    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    
    
      useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          setIsScrollingUp(prevScrollPos > currentScrollPos);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

      const handleToTop = () => {
        window.scrollTo(0, 0); // Scroll to top
       
      };

    return ( 
        <div>
          <Helmet>
            <title>Based on Form - Terms of Use</title>
          </Helmet>
        
            <header 
                style={{
                    position: isScrollingUp ? 'sticky' : 'relative',
                    top: isScrollingUp ? '0' : 'auto',
                    transition: 'top 0.5s ease-in',
                }}
            >
             <h1 style={{ margin: 'auto', cursor: 'pointer' }}>
                  <NavLink to="/" className="navbar__a" onClick={handleToTop}>
                    Based on Form
                  </NavLink>
              </h1>
            </header>

          <div id='privacy_policy' className='main_privacy_policy'>
          
              <h3 class="pitch">Terms of Use of Base on Form</h3>
              <i>Last Updated: 01/08/2024</i>
              
              <p>Welcome to Based on Form! By accessing or using our website, basedonform.com ("Website"), you agree to comply with and be bound by the following terms and conditions ("Terms of Use"). Please read these Terms of Use carefully before using our Website. If you do not agree to these Terms, you must not use our Website.</p>
              <ol class="privacy_policy">
                  <li class="subheading">Acceptance of Terms</li>
                  <p>By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, as well as our Privacy Policy, which is incorporated herein by reference.</p>
                  <p></p>
                  <li class="subheading">Eligibility</li>
                  <p>You must be at least 18 years old to use our Website. By using the Website, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms of Use</p>
                  <p></p>
                  
                  <li class="subheading">User Accounts</li>
                  
                  <ul>
                      <li><span class="bold_list">Registration: </span>To access certain features of the Website, you may be required to create an account. You must provide accurate and complete information during the registration process and keep your account information up-to-date.</li>
                      <li><span class="bold_list">Account Security: </span>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</li>
                      <li><span class="bold_list">Account Termination: </span>We reserve the right to terminate or suspend your account at any time, with or without notice, for any reason, including if we believe you have violated these Terms of Use.</li>
                      
                  </ul>
                  <p></p>
                  <li class="subheading">Use of the Website</li>
                  <ul>
                      <li><span class="bold_list">Permitted Use: </span> You may use the Website for personal and non-commercial purposes only. You agree not to use the Website for any illegal or unauthorized purpose.</li>
                      <li><span class="bold_list">Prohibited Activities: </span> You agree not to:</li>
                      <ul>
                        <li>Use the Website to engage in any form of gambling or betting that violates applicable laws.</li>
                        <li>Distribute or post spam, unsolicited communications, or pyramid schemes.</li>
                        <li>Harvest or collect information from users of the Website without their consent.</li>
                        <li>Upload or transmit viruses, malware, or any other harmful code.</li>
                        <li>Attempt to gain unauthorized access to our systems or networks.</li>
                      </ul>
                  </ul>
                  <p></p>
                  <li class="subheading">Intellectual Property</li>
                  <ul>
                      <li><span class="bold_list">Ownership: </span>All content, trademarks, logos, and intellectual property on the Website are the property of Based on Form or its licensors, and other third parties as Permitted for use. You may not use, copy, reproduce, or distribute any content from the Website without our prior written consent.</li>
                      <li><span class="bold_list">User Content: </span>By submitting or posting content on the Website, you grant Based on Form a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, modify, and distribute your content in connection with the operation of the Website.</li>
                      
                  </ul>
                  <p></p>
                  <li class="subheading">Disclaimers</li>
                  <ul>
                      <li><span class="bold_list">No Warranties: </span>The Website is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or secure, nor do we make any warranties regarding the accuracy, reliability, or completeness of any content on the Website.</li>
                      <li><span class="bold_list">Prediction: </span>The predictions and betting tips provided on Based on Form are for informational purposes only and should not be considered as guaranteed outcomes. Users are responsible for their own decisions based on the information provided, and Based on Form is not liable for any losses or damages resulting from such decisions.</li>
                      <li><span class="bold_list">Third-Party Interactions: </span>The Website may contain advertisements and links to third-party websites or services. Based on Form is not responsible for the content, privacy policies, or practices of any third-party websites or services. Any interactions, transactions, or engagements you have with third-party companies through advertisements or links on our Website are solely between you and the third party. We shall not be liable for any loss, damage, or other consequences resulting from such interactions.</li>
                      
                  </ul>
                  <p></p>

                  <li class="subheading">Limitation of Liability</li>
                  <p>To the fullest extent permitted by law, Based on Form, its affiliates, directors, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, or goodwill, arising out of your access to or use of the Website.</p>
                  <li class="subheading">Indemnification</li>
                  <p>You agree to indemnify and hold harmless Based on Form, its affiliates, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Website, your violation of these Terms of Use, or your infringement of any intellectual property or other rights of any person or entity.</p>
                  <li class="subheading">Modifications to the Terms</li>
                  <p>Based on Form reserves the right to modify these Terms of Use at any time. We will notify you of any material changes by posting the revised Terms on the Website. Your continued use of the Website following any changes constitutes your acceptance of the revised Terms.</p>
                  <li class="subheading">Governing Law</li>
                  <p>These Terms of Use shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles. Any legal action or proceeding arising out of or related to these Terms of Use shall be brought exclusively in the courts of Nigeria.</p>
                  <li class="subheading">Contact Us</li>
                  <p>If you have any questions about these Terms of Use, please <a href="mailto:admin@basedonform.com">Contact Us</a></p>
                                  
                  
              </ol>
          </div>

        </div>
    )
}

export default TermsOfUse;