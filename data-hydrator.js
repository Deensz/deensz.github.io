document.addEventListener('DOMContentLoaded', () => {
    fetch('data/site.json')
        .then(res => res.json())
        .then(data => {
            // Hero
            const heroHeadline = document.getElementById('heroHeadline');
            if (heroHeadline && data.hero) heroHeadline.innerHTML = `${data.hero.headline_1}<span class="gradient-text">${data.hero.headline_2}</span>${data.hero.headline_3}`;
            const heroSubheadline = document.getElementById('heroSubheadline');
            if (heroSubheadline && data.hero.subtitle) heroSubheadline.textContent = data.hero.subtitle;

            // About
            const aboutDescription = document.getElementById('aboutDescription');
            if (aboutDescription && data.about.description) aboutDescription.textContent = data.about.description;

            const educationList = document.getElementById('education-list');
            if (educationList && data.about.education) {
                educationList.innerHTML = data.about.education.map(edu => `
                    <div class="${edu.status === 'Sedang Berlangsung' ? 'bg-gradient-to-r from-primary-50 to-blue-50 border-primary-100' : 'bg-gray-50 border-gray-100'} p-6 rounded-2xl border">
                        <div class="flex items-start gap-4">
                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                                <svg class="w-7 h-7 ${edu.status === 'Sedang Berlangsung' ? 'text-primary-600' : 'text-gray-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                ${edu.status ? `<span class="inline-block px-3 py-1 ${edu.status === 'Sedang Berlangsung' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} text-xs font-medium rounded-full mb-2">${edu.status}</span>` : ''}
                                <h4 class="font-semibold text-gray-900">${edu.degree}</h4>
                                <p class="text-primary-600 text-sm font-medium mb-2">${edu.school}</p>
                                <p class="text-gray-500 text-sm">${edu.desc}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Services
            const servicesGrid = document.getElementById('services-grid');
            if (servicesGrid && data.services) {
                servicesGrid.innerHTML = data.services.map(service => `
                    <div class="card-hover bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20">
                            <!-- Service SVG -->
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">${service.title}</h3>
                        <p class="text-gray-600 mb-6">${service.description}</p>
                        <ul class="space-y-3">
                            ${service.items.map(item => `
                                <li class="flex items-center text-sm text-gray-600">
                                    <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                                    ${item}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('');
            }

            // Skills - Technical
            const technicalSkillsList = document.getElementById('technical-skills-list');
            if (technicalSkillsList && data.skills.technical) {
                technicalSkillsList.innerHTML = data.skills.technical.map(skill => `
                    <div>
                        <div class="flex justify-between mb-2">
                            <span class="font-medium text-gray-800">${skill.name}</span>
                            <span class="text-primary-600 font-semibold">${skill.percent}%</span>
                        </div>
                        <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div class="skill-bar h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full w-0" style="width: ${skill.percent}%"></div>
                        </div>
                    </div>
                `).join('');
            }

            // Skills - Tags
            const skillsTagsList = document.getElementById('skills-tags-list');
            if (skillsTagsList && data.skills.tags) {
                skillsTagsList.innerHTML = data.skills.tags.map(tag => `
                    <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">${tag}</span>
                `).join('');
            }

            // Skills - Soft
            const softSkillsGrid = document.getElementById('soft-skills-grid');
            if (softSkillsGrid && data.skills.soft) {
                softSkillsGrid.innerHTML = data.skills.soft.map((skill, index) => {
                    const isLast = index === data.skills.soft.length - 1 && data.skills.soft.length % 2 !== 0;
                    return `
                        <div class="${isLast ? 'col-span-2 ' : ''}bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-2xl border border-primary-100">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h4 class="font-semibold text-gray-900 mb-1">${skill.title}</h4>
                            <p class="text-sm text-gray-600">${skill.desc}</p>
                        </div>
                    `;
                }).join('');
            }

            // Experience Timeline
            const experienceTimeline = document.getElementById('experience-timeline');
            if (experienceTimeline && data.experience) {
                experienceTimeline.innerHTML = data.experience.map((exp, index) => {
                    const isLeft = index % 2 === 0;
                    return `
                    <div class="relative flex flex-col md:flex-row md:items-center">
                        <div class="md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'hidden md:block'} mb-4 md:mb-0">
                            ${isLeft ? `
                                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ml-8 md:ml-0">
                                    ${exp.badge ? `<span class="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-3">${exp.badge}</span>` : ''}
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">${exp.title}</h3>
                                    <p class="text-primary-600 font-medium text-sm mb-2">${exp.company}</p>
                                    <p class="text-gray-500 text-xs mb-3">${exp.period}</p>
                                    <p class="text-gray-600 text-sm">${exp.desc}</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
                        <div class="md:w-1/2 ${!isLeft ? 'md:pl-12' : 'hidden md:block'}">
                            ${!isLeft ? `
                                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ml-8 md:ml-0">
                                    ${exp.badge ? `<span class="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-3">${exp.badge}</span>` : ''}
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">${exp.title}</h3>
                                    <p class="text-primary-600 font-medium text-sm mb-2">${exp.company}</p>
                                    <p class="text-gray-500 text-xs mb-3">${exp.period}</p>
                                    <p class="text-gray-600 text-sm">${exp.desc}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    `;
                }).join('');
            }

            // Portfolio - Banking Schedule
            const bankingTableBody = document.getElementById('banking-table-body');
            if (bankingTableBody && data.portfolio.banking) {
                bankingTableBody.innerHTML = data.portfolio.banking.map(bpr => `
                    <tr>
                        <td class="font-semibold text-gray-900">${bpr.name}</td>
                        <td class="text-gray-600">${bpr.type}</td>
                        <td class="text-gray-600">${bpr.period}</td>
                        <td><span class="status-badge status-${bpr.status === 'Selesai' ? 'completed' : 'ongoing'}">${bpr.status}</span></td>
                    </tr>
                `).join('');
            }

            // Portfolio - Government Projects
            const governmentGrid = document.getElementById('government-grid');
            if (governmentGrid && data.portfolio.government) {
                governmentGrid.innerHTML = data.portfolio.government.map(proj => `
                    <div class="card-hover bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div class="flex items-start gap-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-bold text-gray-900 mb-1">${proj.title}</h4>
                                <p class="text-primary-600 font-medium text-sm mb-2">${proj.location}</p>
                                <p class="text-gray-500 text-xs mb-3">${proj.period}</p>
                                <p class="text-gray-600 text-sm">${proj.desc}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Contact
            const contactPhone = document.getElementById('contactPhone');
            if (contactPhone && data.contact.phone) {
                contactPhone.textContent = data.contact.phone;
            }
        })
        .catch(err => console.error('Error hydrating data:', err));
});
