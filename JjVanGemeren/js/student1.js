document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://backend11acs02group52026.vercel.app";

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        async function submitContactForm(e) {
            e.preventDefault();
            const statusDiv = document.getElementById("contactStatusMessage");
            statusDiv.innerHTML = `<div class="alert alert-info">Sending message...</div>`;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;

            const payload = {
                full_name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").options[document.getElementById("subject").selectedIndex].text,
                message: document.getElementById("message").value,
                user_id: null
            };

            try {
                const response = await fetch(`${baseURL}/post/contact-messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error("Failed to send message.");
                }

                statusDiv.innerHTML = `<div class="alert alert-success">Message sent successfully! We will get back to you soon.</div>`;
                contactForm.reset();
                const messageEl = document.getElementById("message");
                if (messageEl) messageEl.dispatchEvent(new Event("input"));
            } catch (error) {
                statusDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
            } finally {
                submitBtn.disabled = false;
            }
        }
        
        contactForm.addEventListener("submit", submitContactForm);
    }

    const messageInput = document.getElementById("message");
    if (messageInput) {
        const counterDiv = document.createElement("small");
        counterDiv.className = "text-muted float-end mt-1";
        counterDiv.innerText = "0/500 characters";
        messageInput.parentNode.appendChild(counterDiv);

        function updateCharacterCount(e) {
            const currentLength = e.target.value.length;
            counterDiv.innerText = `${currentLength}/500 characters`;
            if (currentLength > 500) {
                counterDiv.classList.add("text-danger");
                counterDiv.classList.remove("text-muted");
            } else {
                counterDiv.classList.remove("text-danger");
                counterDiv.classList.add("text-muted");
            }
        }
        
        messageInput.addEventListener("input", updateCharacterCount);
    }

    const deptButtons = document.querySelectorAll('[data-dept]');
    deptButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const subjectVal = btn.getAttribute('data-dept');
            const promptText = btn.getAttribute('data-prompt') || '';
            const selectEl = document.getElementById("subject");
            const msgEl = document.getElementById("message");
            const statusDiv = document.getElementById("contactStatusMessage");

            if (selectEl) {
                for (let i = 0; i < selectEl.options.length; i++) {
                    if (selectEl.options[i].text === subjectVal || selectEl.options[i].value === subjectVal) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
            }

            if (msgEl) {
                msgEl.value = promptText + "\n\n";
                msgEl.dispatchEvent(new Event('input'));
            }

            if (statusDiv) {
                statusDiv.innerHTML = `<div class="alert alert-primary alert-dismissible fade show shadow-sm mb-4" role="alert">
                    <i class="fa-solid fa-circle-check me-2"></i>Routed inquiry to <strong>${subjectVal}</strong> department. Please complete your contact details below.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }

            const formCard = document.querySelector('.contact-form-card') || contactForm;
            if (formCard) {
                formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (msgEl) {
                    setTimeout(() => msgEl.focus(), 600);
                }
            }
        });
    });

    const faqAccordion = document.getElementById("faqAccordion");
    const faqSearchForm = document.getElementById("faqSearchForm");

    const supplementaryFaqs = {
        "Mobile Devices": [
            { category: "Mobile Devices", question: "How do I transfer my physical SIM to a Cytek eSIM profile?", answer: "Open Settings > Cellular > Add eSIM, and scan the high-security QR code provided by your telecom carrier or initiate automatic cloud transfer via your Cytek ID." },
            { category: "Mobile Devices", question: "Why is my display refresh rate dropping to 10Hz?", answer: "Cytek OLED displays incorporate advanced LTPO architecture that dynamically shifts down to 10Hz when displaying static graphics, conserving up to 30% daily battery endurance." }
        ],
        "Laptops & Systems": [
            { category: "Laptops & Systems", question: "Can I upgrade the NVMe SSD storage in my Cytek Workstation?", answer: "Yes, all Cytek 15-inch and 17-inch mobile workstations feature dual high-speed M.2 NVMe PCIe 4.0 expandable slots supporting up to 8TB of storage." },
            { category: "Laptops & Systems", question: "How do I resolve Thunderbolt 4 docking video glitches?", answer: "Ensure your USB-C cable is Intel certified (marked with a numeral '4' lightning crest) and run the automated firmware verification in the Cytek Support Assistant tool." }
        ],
        "Audio & Wearables": [
            { category: "Audio & Wearables", question: "How do I calibrate Active Noise Cancellation (ANC) for aviation or altitude?", answer: "Inside the Cytek Acoustic Control mobile app, select 'Atmospheric Calibration' to launch the rapid 5-second ambient ear-canal barometric pressure equalization test." },
            { category: "Audio & Wearables", question: "Can I connect my headset to my laptop and smartphone simultaneously?", answer: "Yes! Dual Bluetooth Multipoint protocols enable continuous simultaneous pairing with two devices, instantly shifting incoming voice calls over active desktop media feeds." }
        ],
        "Shipping & Delivery": [
            { category: "Shipping & Delivery", question: "What courier service is utilized for express Benelux logistics?", answer: "We partner exclusively with DHL Express and PostNL Premium for Benelux regional transport, guaranteeing next-day AM fulfillment for orders authorized prior to 21:00 CET." },
            { category: "Shipping & Delivery", question: "How do I proceed if my freight carton arrived with external handling damage?", answer: "Do not discard any internal packing shells. Photograph all 6 outer box panels alongside the courier waybill and initiate a Priority Insurance Case via our Logistics Support Desk within 48 hours." }
        ],
        "Trade-In & Refurbish": [
            { category: "Trade-In & Refurbish", question: "How does the automated device physical inspection appraisal work?", answer: "Once your preliminary online estimate is confirmed, print our prepaid DPD return voucher. Upon scan-in at our Geel depot, specialized technicians evaluate display coatings and diagnostic cycle health within 24 hours." },
            { category: "Trade-In & Refurbish", question: "Can I redeem trade-in voucher credits directly at initial checkout?", answer: "Yes! Select 'Instant Trade-In Eco-Credit' at digital checkout to apply an immediate price deduction prior to surrendering your verified legacy hardware." }
        ],
        "Account & Security": [
            { category: "Account & Security", question: "How do I restore account access if my hardware 2FA key was lost or damaged?", answer: "You must input one of the eight-digit encrypted backup codes generated during authentication bonding, or authorize a notarized video identity verification via our Security & Privacy desk." },
            { category: "Account & Security", question: "What is the completion timeline for a complete GDPR Data Archive export?", answer: "For standard consumer accounts, your encrypted zero-trust ZIP volume containing diagnostic logs, purchase invoices, and telephonic support transcripts is generated and securely distributed within 4 business hours." }
        ]
    };

    if (faqAccordion) {
        const loadFaqs = async (keyword = "") => {
            const statusDiv = document.getElementById("faqStatusMessage");
            faqAccordion.innerHTML = "";
            statusDiv.innerHTML = `<div class="alert alert-info">Loading FAQs...</div>`;

            try {
                let url = `${baseURL}/get/faqs`;
                if (keyword) {
                    url = `${baseURL}/get/faqs/search?keyword=${encodeURIComponent(keyword)}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to load FAQs.");
                }

                let faqs = await response.json();
                statusDiv.innerHTML = "";

                if (keyword) {
                    const searchLower = keyword.toLowerCase().trim();
                    faqs = faqs.filter(faq => {
                        const q = (faq.question || "").toLowerCase();
                        const a = (faq.answer || "").toLowerCase();
                        const c = (faq.category || "").toLowerCase();
                        return q.includes(searchLower) || a.includes(searchLower) || c.includes(searchLower) || searchLower.includes(c) || c.includes(searchLower.split(' ')[0]);
                    });

                    Object.keys(supplementaryFaqs).forEach(cat => {
                        if (cat.toLowerCase().includes(searchLower) || searchLower.includes(cat.toLowerCase().split(' ')[0])) {
                            faqs = faqs.concat(supplementaryFaqs[cat]);
                        }
                    });
                    const seen = new Set();
                    faqs = faqs.filter(item => {
                        const duplicate = seen.has(item.question);
                        seen.add(item.question);
                        return !duplicate;
                    });
                } else if (faqs.length < 5) {
                    Object.values(supplementaryFaqs).forEach(arr => {
                        if (arr[0]) faqs.push(arr[0]);
                    });
                }

                if (faqs.length === 0) {
                    faqAccordion.innerHTML = `<p class="text-center text-muted my-4">No specific FAQ articles found matching "<strong>${keyword}</strong>". Please use our direct contact support below.</p>`;
                    return;
                }

                faqs.forEach((faq, index) => {
                    const isExpanded = index === 0 ? "true" : "false";
                    const collapseClass = index === 0 ? "show" : "";
                    const buttonClass = index === 0 ? "" : "collapsed";
                    const headingId = `heading${index}`;
                    const collapseId = `collapse${index}`;

                    const itemHtml = `
                        <div class="accordion-item mb-3 shadow-sm border rounded">
                            <h2 class="accordion-header" id="${headingId}">
                                <button class="accordion-button ${buttonClass} fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                                    ${faq.question}
                                </button>
                            </h2>
                            <div id="${collapseId}" class="accordion-collapse collapse ${collapseClass}" aria-labelledby="${headingId}" data-bs-parent="#faqAccordion">
                                <div class="accordion-body bg-light">
                                    <span class="badge bg-secondary mb-2">${faq.category || 'General Support'}</span>
                                    <p class="mb-0 text-secondary">${faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    faqAccordion.insertAdjacentHTML('beforeend', itemHtml);
                });

            } catch (error) {
                statusDiv.innerHTML = `<div class="alert alert-danger">Error loading FAQs: ${error.message}</div>`;
            }
        };

        loadFaqs();

        if (faqSearchForm) {
            function submitFaqSearch(e) {
                e.preventDefault();
                const keyword = document.getElementById("faqSearchInput").value.trim();
                loadFaqs(keyword);
            }
            
            faqSearchForm.addEventListener("submit", submitFaqSearch);
        }

        const categoryButtons = document.querySelectorAll('[data-faq-category]');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const catName = btn.getAttribute('data-faq-category');
                const searchInput = document.getElementById("faqSearchInput");
                const statusDiv = document.getElementById("faqStatusMessage");

                if (searchInput) {
                    searchInput.value = catName;
                }

                if (statusDiv) {
                    statusDiv.innerHTML = `<div class="alert alert-primary alert-dismissible fade show shadow-sm mb-3" role="alert">
                        <i class="fa-solid fa-filter me-2"></i>Filtering support knowledge base for category: <strong>${catName}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                }

                loadFaqs(catName);

                const searchSection = document.querySelector('.faq-search-section') || faqSearchForm;
                if (searchSection) {
                    searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (searchInput) {
                        setTimeout(() => searchInput.focus(), 600);
                    }
                }
            });
        });
    }
});

