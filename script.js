document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progress-bar');
    const saveLaterModal = document.getElementById('save-later-modal');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');

    let currentStep = 0;
    const formData = {
        venueName: '',
        address: '',
        contactName1: '',
        contactRole1: '',
        contactPhone1: '',
        contactEmail1: '',
        contactName2: '',
        contactRole2: '',
        contactPhone2: '',
        businessType: [],
        gstNumber: '',
        bankAccountName: '',
        bankAccountNumber: '',
        ifscCode: '',
        paymentFrequency: '',
        operatingHours: '',
        capacity: '',
        socialMedia: '',
        commission: '10%',
        menuItems: [{ name: '', price: '' }],
        signatureData: null
    };

    const steps = [
        'Intro',
        'Business Details',
        'Legal & Financial',
        'Venue Operations',
        'Menu & Media',
        'Commercial Terms',
        'Digital Agreement',
        'Review',
        'Confirmation'
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep();
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'businessType') {
            if (checked) {
                formData.businessType.push(value);
            } else {
                formData.businessType = formData.businessType.filter(t => t !== value);
            }
        } else {
            formData[name] = value;
        }
    };
    
    const handleBusinessTypeClick = (type, button) => {
        const index = formData.businessType.indexOf(type);
        if (index > -1) {
            formData.businessType.splice(index, 1);
            button.classList.remove('active');
        } else {
            formData.businessType.push(type);
            button.classList.add('active');
        }
    };

    const handleMenuItemChange = (index, e) => {
        formData.menuItems[index][e.target.name] = e.target.value;
    };

    const addMenuItem = () => {
        formData.menuItems.push({ name: '', price: '' });
        renderStep(); // Re-render the current step to show the new item
    };
    
    const getButtonText = () => {
        const textMap = {
            1: 'Next: Legal & Financial',
            2: 'Next: Venue Operations',
            3: 'Next: Menu & Media',
            4: 'Next: Commercial Terms',
            5: 'Next: Digital Agreement',
            6: 'Next: Review',
            7: 'Finalize & Submit'
        };
        return textMap[currentStep] || 'Next';
    };


    const renderStep = () => {
        formContainer.innerHTML = '';
        const isIntroOrConfirmation = currentStep === 0 || currentStep === steps.length - 1;

        // Update Header and Progress Bar visibility
        if (isIntroOrConfirmation) {
            header.classList.add('opacity-0');
            header.classList.remove('opacity-100');
        } else {
            header.classList.remove('opacity-0');
            header.classList.add('opacity-100');
            const progress = ((currentStep - 1) / (steps.length - 3)) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Update form container styles
        formContainer.className = `w-full max-w-4xl transition-all duration-500 ${isIntroOrConfirmation ? '' : 'bg-brand-dark-secondary backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border-2 border-gray-800'}`;
        
        let content = '';

        switch (currentStep) {
            case 0: // Welcome Modal
                content = `
                    <div class="flex flex-col items-center justify-center p-8 text-center">
                        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 text-white heading-glow">
                            Put Your Club on <span class="text-gradient-neon">30ML</span> — in <span class="text-cyan-400">5 Minutes!</span>
                        </h1>
                        <p class="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
                            Claim your free monthly credit and unlock powerful tools to boost bookings, fill tables, and grow profits — starting right now.
                        </p>
                        <div class="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center">
                            <button id="start-onboarding-btn" class="cta-button py-3 px-8 text-lg font-bold">💎 Onboard Now & Claim ₹20K</button>
                            <button id="save-later-btn" class="outline-button py-3 px-8 text-lg font-bold">📩 Send Me Link Later</button>
                        </div>
                        <p class="text-sm text-gray-500 mt-8">Every Week, New clubs get onboarded</p>
                    </div>`;
                break;
            case 1: // Business Details
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Your Venue’s Identity</h2>
                    <p class="text-gray-400 mb-8">This info helps us set up your 30ML+ account and begin your journey.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-300 mb-2">Venue Name (Legal + Display)</label>
                            <input type="text" name="venueName" value="${formData.venueName}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Business Type</label>
                            <div class="flex flex-wrap gap-2" id="business-type-container">
                                ${['Club', 'Pub', 'Lounge', 'Café', 'Restaurant'].map(type => `
                                    <button data-type="${type}" class="neon-button px-4 py-2 rounded-full font-bold text-sm ${formData.businessType.includes(type) ? 'active' : ''}">
                                        ${type}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-gray-300 mb-2">Address</label>
                            <div class="relative">
                                <input type="text" name="address" value="${formData.address}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12" />
                                <button class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-cyan-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-300 mb-2">Contact Person 1 Name</label>
                                <input type="text" name="contactName1" value="${formData.contactName1}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label class="block text-gray-300 mb-2">Contact Person 1 Role</label>
                                <input type="text" name="contactRole1" value="${formData.contactRole1}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label class="block text-gray-300 mb-2">Contact Person 1 Phone</label>
                                <input type="tel" name="contactPhone1" value="${formData.contactPhone1}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label class="block text-gray-300 mb-2">Contact Person 1 Email</label>
                                <input type="email" name="contactEmail1" value="${formData.contactEmail1}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        </div>
                    </div>`;
                break;
            case 2: // Legal & Financial
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Payment & Payout Info</h2>
                    <p class="text-gray-400 mb-8">This is for secure payouts and legal verification.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-300 mb-2">GST / Business Registration Number</label>
                            <input type="text" name="gstNumber" value="${formData.gstNumber}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Bank Account Name</label>
                            <input type="text" name="bankAccountName" value="${formData.bankAccountName}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Bank Account Number</label>
                            <input type="text" name="bankAccountNumber" value="${formData.bankAccountNumber}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">IFSC Code</label>
                            <input type="text" name="ifscCode" value="${formData.ifscCode}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Payment Frequency Preference</label>
                            <select name="paymentFrequency" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <option value="">Select...</option>
                                <option ${formData.paymentFrequency === 'Weekly' ? 'selected' : ''}>Weekly</option>
                                <option ${formData.paymentFrequency === 'Monthly' ? 'selected' : ''}>Monthly</option>
                            </select>
                        </div>
                    </div>`;
                break;
            case 3: // Venue Operations
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Venue Operations Info</h2>
                    <p class="text-gray-400 mb-8">This data helps the platform showcase your unique offerings.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-300 mb-2">Operating Hours</label>
                            <input type="text" name="operatingHours" value="${formData.operatingHours}" placeholder="e.g., 6 PM - 1 AM" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Seating Capacity (Total Pax)</label>
                            <input type="number" name="capacity" value="${formData.capacity}" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-gray-300 mb-2">Social Media Links</label>
                            <input type="url" name="socialMedia" value="${formData.socialMedia}" placeholder="e.g., instagram.com/yourclub" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                    </div>`;
                break;
            case 4: // Menu & Media
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Menu & Media Details</h2>
                    <p class="text-gray-400 mb-8">Help us showcase your best offerings to our members.</p>
                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-white mb-4">Popular Cocktails / Dishes</h3>
                        <div id="menu-items-container">
                            ${formData.menuItems.map((item, index) => `
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-gray-300 mb-2">Item Name</label>
                                        <input type="text" name="name" value="${item.name}" data-index="${index}" class="menu-item-input w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                    </div>
                                    <div>
                                        <label class="block text-gray-300 mb-2">Price (₹)</label>
                                        <input type="number" name="price" value="${item.price}" data-index="${index}" class="menu-item-input w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                    </div>
                                </div>`).join('')}
                        </div>
                        <button id="add-menu-item-btn" class="mt-2 text-sm text-cyan-400 hover:underline">+ Add another item</button>
                    </div>`;
                break;
            case 5: // Commercial Terms
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Commercial Terms</h2>
                    <p class="text-gray-400 mb-8">Choose your pricing plan and confirm your credit offer.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-300 mb-2">Commission %</label>
                            <select name="commission" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <option ${formData.commission === '10%' ? 'selected' : ''}>10%</option>
                                <option ${formData.commission === '15%' ? 'selected' : ''}>15%</option>
                                <option ${formData.commission === '20%' ? 'selected' : ''}>20%</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-8 bg-gray-900 rounded-xl p-6 mb-8 border border-gray-700">
                        <h3 class="text-xl font-bold text-white mb-4">Confirm Your Free Credit</h3>
                        <div class="flex items-center">
                            <input type="checkbox" checked class="form-checkbox h-5 w-5 text-pink-500 rounded-md bg-gray-700 border-gray-600 focus:ring-pink-500" readOnly />
                            <p class="ml-2 text-white text-lg">Yes, I want to avail my free <span class="text-cyan-400">₹20K/month</span> wallet credit for the first 3 months.</p>
                        </div>
                    </div>`;
                break;
            case 6: // Digital Agreement
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Finalize Your Agreement</h2>
                    <p class="text-gray-400 mb-8">Please sign below to digitally execute the agreement.</p>
                    <div class="relative">
                        <canvas id="signature-canvas" width="800" height="200" class="w-full h-48 bg-gray-800 border-2 border-gray-700 rounded-lg cursor-crosshair"></canvas>
                        <button id="clear-signature-btn" class="absolute top-2 right-2 text-white bg-gray-700 py-1 px-3 rounded-lg text-sm hover:bg-red-500 transition-colors">Clear</button>
                    </div>`;
                break;
            case 7: // Review
                content = `
                    <h2 class="text-3xl font-bold mb-2 text-white">Review Your Details</h2>
                    <p class="text-gray-400 mb-8">Please review your information before finalizing the agreement.</p>
                    <div class="bg-gray-900 rounded-xl p-6 mb-4 border border-gray-700 space-y-2">
                        <h3 class="text-xl font-bold text-white">Business Details</h3>
                        <p class="text-gray-400"><strong>Venue Name:</strong> ${formData.venueName || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Business Type:</strong> ${formData.businessType.join(', ') || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Address:</strong> ${formData.address || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Contact 1:</strong> ${formData.contactName1 || 'N/A'} (${formData.contactRole1 || 'N/A'})</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl p-6 mb-4 border border-gray-700 space-y-2">
                        <h3 class="text-xl font-bold text-white">Legal & Financial</h3>
                        <p class="text-gray-400"><strong>GST Number:</strong> ${formData.gstNumber || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Bank Name:</strong> ${formData.bankAccountName || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Account Number:</strong> ${formData.bankAccountNumber || 'N/A'}</p>
                        <p class="text-gray-400"><strong>Payment Frequency:</strong> ${formData.paymentFrequency || 'N/A'}</p>
                    </div>`;
                break;
            case 8: // Confirmation
                content = `
                    <div class="flex flex-col items-center justify-center text-center p-8">
                        <h2 class="text-5xl font-extrabold text-white text-gradient-neon mb-4">You’re Officially on the 30ML+ Network! 🎉</h2>
                        <p class="text-lg text-gray-400 mb-8 max-w-xl">
                            Your venue is in 'Pending Activation' status. Our team will verify your details and after that a copy of your signed agreement has been sent to your email.
                        </p>
                        <div class="space-y-4">
                            <a href="index.html" class="cta-button inline-block py-3 px-8 text-lg font-bold">Go to My Dashboard</a>
                            <p class="text-sm text-gray-500">Your login details will be sent shortly.</p>
                        </div>
                    </div>`;
                break;
        }

        formContainer.innerHTML = content;

        // Add navigation buttons if not on intro or confirmation
        if (!isIntroOrConfirmation) {
            const navContainer = document.createElement('div');
            navContainer.className = 'mt-12 flex justify-between';
            navContainer.innerHTML = `
                <button id="back-btn" class="text-gray-400 hover:text-white transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                </button>
                <button id="next-btn" class="cta-button py-3 px-8 text-lg font-bold">${getButtonText()}</button>
            `;
            formContainer.appendChild(navContainer);
        }

        addEventListeners();
    };

    const setupSignaturePad = () => {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1f2937'; // bg-gray-800
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#F000B8';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        let isSigning = false;
        
        const getPosition = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        const startSign = (e) => {
            isSigning = true;
            const pos = getPosition(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        };

        const drawSign = (e) => {
            if (!isSigning) return;
            const pos = getPosition(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        };

        const endSign = () => {
            if (!isSigning) return;
            isSigning = false;
            formData.signatureData = canvas.toDataURL();
        };
        
        const clearSign = () => {
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            formData.signatureData = null;
        }

        canvas.addEventListener('mousedown', startSign);
        canvas.addEventListener('mousemove', drawSign);
        canvas.addEventListener('mouseup', endSign);
        canvas.addEventListener('mouseout', endSign);
        
        document.getElementById('clear-signature-btn').addEventListener('click', clearSign);
    };

    const addEventListeners = () => {
        // Form inputs
        formContainer.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', handleInputChange);
        });
        
        // Business type buttons
        formContainer.querySelectorAll('#business-type-container button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                handleBusinessTypeClick(e.target.dataset.type, e.target);
            });
        });
        
        // Menu item inputs
        formContainer.querySelectorAll('.menu-item-input').forEach(input => {
            input.addEventListener('change', (e) => handleMenuItemChange(e.target.dataset.index, e));
        });
        
        // Add menu item button
        const addMenuItemBtn = document.getElementById('add-menu-item-btn');
        if(addMenuItemBtn) addMenuItemBtn.addEventListener('click', addMenuItem);

        // Navigation buttons
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) nextBtn.addEventListener('click', handleNext);
        const backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.addEventListener('click', handleBack);

        // Intro screen buttons
        const startBtn = document.getElementById('start-onboarding-btn');
        if (startBtn) startBtn.addEventListener('click', handleNext);
        const saveLaterBtn = document.getElementById('save-later-btn');
        if (saveLaterBtn) saveLaterBtn.addEventListener('click', () => saveLaterModal.classList.remove('hidden'));

        // Signature Pad
        if (currentStep === 6) {
            setupSignaturePad();
        }
    };

    // Modal listeners
    cancelModalBtn.addEventListener('click', () => saveLaterModal.classList.add('hidden'));

    // Initial render
    renderStep();
});