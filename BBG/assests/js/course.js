document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('lesson-content');
    const status = document.getElementById('lesson-status');
    const title = document.getElementById('lesson-title');
    const download = document.getElementById('lesson-download');
    let materialTabs = document.querySelectorAll('[data-material-file]');
    let activeRequest = 0;
    let diagramId = 0;
    let activeWeekNumber = null;
    const courseWeeks = window.courseWeeks || [];

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    function renderWeekCards() {
        const grid = document.getElementById('week-grid');
        if (!grid) return;

        grid.innerHTML = courseWeeks.map((week, index) => {
            const available = week.materials.length > 0;
            const statusLabel = week.number === 1
                ? 'Tanışma'
                : available
                    ? `<i class="fas fa-check-circle" aria-hidden="true"></i> ${week.materials.length} materyal`
                    : 'Yakında';
            const delay = index % 3 === 1 ? ' delay-100' : index % 3 === 2 ? ' delay-200' : '';
            return `<article class="week-card glass-card reveal-init${delay}">
                <div class="week-card-top">
                    <span class="week-number">${String(week.number).padStart(2, '0')}</span>
                    <span class="week-status ${available || week.number === 1 ? 'available' : 'upcoming'}">${statusLabel}</span>
                </div>
                <p class="week-label">${week.number}. hafta</p>
                <h3>${escapeHtml(week.title)}</h3>
                <p>${escapeHtml(week.description)}</p>
                <a class="week-open" href="hafta.html?hafta=${week.number}">${available ? week.number === 1 ? 'Tanışma özetine git' : 'Ders materyallerine git' : week.number === 1 ? 'Tanışma haftasına git' : 'Haftaya git'} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </article>`;
        }).join('');
    }

    function setupWeekPage() {
        if (!document.body.classList.contains('week-detail-page')) return;

        const requestedNumber = Number(new URLSearchParams(window.location.search).get('hafta'));
        const week = courseWeeks.find(item => item.number === requestedNumber) || courseWeeks[0];
        if (!week) {
            window.location.replace('index.html#program');
            return;
        }

        activeWeekNumber = week.number;
        const titleElement = document.getElementById('week-title');
        const descriptionElement = document.getElementById('week-description');
        const eyebrow = document.getElementById('week-eyebrow');
        const weekLabel = document.getElementById('lesson-week-label');
        const sidebar = document.getElementById('lesson-sidebar');
        const tabsContainer = document.getElementById('material-tabs');
        const panel = document.getElementById('lesson-panel');
        const hint = document.querySelector('.pdf-hint');
        const pagination = document.getElementById('week-pagination');
        const footerLabel = document.getElementById('footer-week-label');
        const pdfButton = document.querySelector('.pdf-download');

        document.title = `${week.number}. Hafta: ${week.title} | Bilgisayar Bilimlerine Giriş`;
        titleElement.innerHTML = `${week.number}. Hafta <span class="gradient-text">${escapeHtml(week.title)}</span>`;
        descriptionElement.textContent = week.description;
        eyebrow.textContent = `${String(week.number).padStart(2, '0')} · ${week.materials.length ? 'Ders materyalleri' : '6 haftalık ders'}`;
        weekLabel.textContent = `${week.number}. hafta`;
        footerLabel.textContent = `Bilgisayar Bilimlerine Giriş · ${week.number}. Hafta`;

        const previous = courseWeeks.find(item => item.number === week.number - 1);
        const next = courseWeeks.find(item => item.number === week.number + 1);
        const previousLink = document.getElementById('previous-week');
        const nextLink = document.getElementById('next-week');
        if (previous) {
            previousLink.href = `hafta.html?hafta=${previous.number}`;
            previousLink.innerHTML = `<i class="fas fa-arrow-left" aria-hidden="true"></i> ${previous.number}. hafta · ${escapeHtml(previous.title)}`;
        } else {
            previousLink.hidden = true;
        }
        if (next) {
            nextLink.href = `hafta.html?hafta=${next.number}`;
            nextLink.innerHTML = `${next.number}. hafta · ${escapeHtml(next.title)} <i class="fas fa-arrow-right" aria-hidden="true"></i>`;
        } else {
            nextLink.hidden = true;
        }

        if (week.materials.length === 0) {
            sidebar.hidden = true;
            panel.classList.add('lesson-panel-empty');
            panel.querySelector('.lesson-toolbar').hidden = false;
            title.textContent = `${week.number}. Hafta`;
            download.hidden = true;
            hint.hidden = true;
            status.hidden = true;
            content.innerHTML = `<div class="week-empty-state">
                <span class="week-welcome-icon"><i class="fas ${week.number === 1 ? 'fa-handshake' : 'fa-hourglass-half'}" aria-hidden="true"></i></span>
                <p class="course-section-kicker">${week.number === 1 ? 'Ders yolculuğuna hoş geldin' : 'Ders içeriği hazırlanıyor'}</p>
                <h2>${week.number === 1 ? 'İlk hafta tanışma haftasıydı' : 'Bu haftanın notları henüz eklenmedi'}</h2>
                <p>${escapeHtml(week.description)}</p>
            </div>`;
            pdfButton.setAttribute('aria-label', `${week.number}. haftayı PDF olarak kaydet`);
            pagination.hidden = !previous && !next;
            return;
        }

        sidebar.hidden = false;
        panel.classList.remove('lesson-panel-empty');
        panel.querySelector('.lesson-toolbar').hidden = false;
        download.hidden = false;
        hint.hidden = false;
        status.hidden = false;
        tabsContainer.innerHTML = week.materials.map((material, index) =>
            `<button class="lesson-tab${index === 0 ? ' active' : ''}" type="button" data-material-file="${escapeHtml(material.file)}" data-material-title="${escapeHtml(material.title)}" aria-current="${index === 0}">
                <span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(material.title)}
            </button>`
        ).join('');
        materialTabs = tabsContainer.querySelectorAll('[data-material-file]');
        materialTabs.forEach(tab => tab.addEventListener('click', () => loadMaterial(tab)));
        pdfButton.setAttribute('aria-label', `${week.number}. hafta materyalini PDF olarak kaydet`);
        pagination.hidden = false;
        loadMaterial(materialTabs[0]);
    }

    function safeHref(value) {
        const href = value.trim();
        return /^(https?:\/\/|#|\.{0,2}\/)/i.test(href) ? href : null;
    }

    function renderInline(value) {
        const codeSpans = [];
        let text = escapeHtml(value).replace(/`([^`]+)`/g, (match, code) => {
            const token = `\u0000${codeSpans.length}\u0000`;
            codeSpans.push(`<code>${code}</code>`);
            return token;
        });

        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
            const destination = safeHref(href);
            if (!destination) return label;
            const external = /^https?:\/\//i.test(destination);
            return `<a href="${escapeHtml(destination)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
        });
        text = text
            .replace(/\*\*(.+?)\*\*|__(.+?)__/g, '<strong>$1$2</strong>')
            .replace(/~~(.+?)~~/g, '<del>$1</del>')
            .replace(/\*(.+?)\*|_(.+?)_/g, '<em>$1$2</em>');

        return text.replace(/\u0000(\d+)\u0000/g, (match, index) => codeSpans[Number(index)]);
    }

    function headingId(value) {
        return value
            .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
            .toLocaleLowerCase('tr')
            .replace(/\s/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '');
    }

    function normalizeHeading(value) {
        return value
            .replace(/^\s*\d+(?:\.\d+)*\.?\s*/, '')
            .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
            .replace(/\(([^)]*)\)/g, (match, phrase) => `(${phrase.toLowerCase()})`)
            .replace(/I/g, 'ı')
            .replace(/İ/g, 'i')
            .replace(/[^\p{L}\p{N}]+/gu, ' ')
            .toLowerCase()
            .trim();
    }

    function splitTableRow(line) {
        return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
    }

    function isTableDivider(line) {
        return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
    }

    function renderMarkdown(markdown) {
        const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
        const blocks = [];
        const headingAliases = new Map();
        for (const match of markdown.matchAll(/\[([^\]]+)\]\((#[^)]+)\)/g)) {
            headingAliases.set(normalizeHeading(match[1]), match[2].slice(1));
        }
        let index = 0;

        while (index < lines.length) {
            const line = lines[index];
            if (!line.trim()) {
                index += 1;
                continue;
            }

            const fence = line.match(/^\s*```([\w-]*)\s*$/);
            if (fence) {
                const code = [];
                index += 1;
                while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
                    code.push(lines[index]);
                    index += 1;
                }
                if (index < lines.length) index += 1;
                if (fence[1].toLowerCase() === 'mermaid') {
                    blocks.push(`<div class="mermaid">${escapeHtml(code.join('\n'))}</div>`);
                    continue;
                }
                const language = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : '';
                blocks.push(`<pre><code${language}>${escapeHtml(code.join('\n'))}</code></pre>`);
                continue;
            }

            const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
            if (heading) {
                const level = heading[1].length;
                const text = heading[2];
                const id = headingAliases.get(normalizeHeading(text)) || headingId(text);
                blocks.push(`<h${level} id="${escapeHtml(id)}">${renderInline(text)}</h${level}>`);
                index += 1;
                continue;
            }

            if (/^\s*(---+|___+|\*\*\*+)\s*$/.test(line)) {
                blocks.push('<hr>');
                index += 1;
                continue;
            }

            if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
                const headers = splitTableRow(line);
                const alignments = splitTableRow(lines[index + 1]).map(cell => {
                    const trimmed = cell.replace(/\s/g, '');
                    if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
                    if (trimmed.endsWith(':')) return 'right';
                    return 'left';
                });
                index += 2;
                const rows = [];
                while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
                    rows.push(splitTableRow(lines[index]));
                    index += 1;
                }
                const headerHtml = headers.map((cell, cellIndex) =>
                    `<th style="text-align:${alignments[cellIndex] || 'left'}">${renderInline(cell)}</th>`
                ).join('');
                const rowHtml = rows.map(row => `<tr>${headers.map((header, cellIndex) =>
                    `<td style="text-align:${alignments[cellIndex] || 'left'}">${renderInline(row[cellIndex] || '')}</td>`
                ).join('')}</tr>`).join('');
                blocks.push(`<div class="markdown-table-wrap"><table><thead><tr>${headerHtml}</tr></thead><tbody>${rowHtml}</tbody></table></div>`);
                continue;
            }

            if (/^\s*>/.test(line)) {
                const quote = [];
                while (index < lines.length && /^\s*>/.test(lines[index])) {
                    quote.push(lines[index].replace(/^\s*>\s?/, ''));
                    index += 1;
                }
                blocks.push(`<blockquote>${renderMarkdown(quote.join('\n'))}</blockquote>`);
                continue;
            }

            const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
            if (listMatch) {
                const ordered = /\d/.test(listMatch[2]);
                const items = [];
                while (index < lines.length) {
                    const item = lines[index].match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
                    if (!item || /\d/.test(item[2]) !== ordered) break;
                    items.push(`<li>${renderInline(item[3])}</li>`);
                    index += 1;
                }
                const tag = ordered ? 'ol' : 'ul';
                blocks.push(`<${tag}>${items.join('')}</${tag}>`);
                continue;
            }

            const paragraph = [line.trim()];
            index += 1;
            while (index < lines.length && lines[index].trim() &&
                !/^(#{1,6})\s+/.test(lines[index]) &&
                !/^\s*```/.test(lines[index]) &&
                !/^\s*>/.test(lines[index]) &&
                !/^\s*([-*+]|\d+\.)\s+/.test(lines[index]) &&
                !/^\s*(---+|___+|\*\*\*+)\s*$/.test(lines[index]) &&
                !(lines[index].includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1]))) {
                paragraph.push(lines[index].trim());
                index += 1;
            }
            blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
        }

        return blocks.join('\n');
    }

    async function renderVisuals() {
        const diagrams = content.querySelectorAll('.mermaid');
        if (diagrams.length > 0) {
            if (!window.mermaid) {
                console.error('Mermaid could not be loaded; course diagrams cannot be rendered.');
                diagrams.forEach(diagram => {
                    diagram.classList.add('diagram-error');
                    diagram.setAttribute('role', 'img');
                    diagram.setAttribute('aria-label', 'Diyagram yüklenemedi; kaynak aşağıda gösteriliyor.');
                    diagram.insertAdjacentHTML('beforebegin', '<p class="visual-error">Diyagram motoru yüklenemedi. İnternet bağlantını kontrol ederek sayfayı yenile.</p>');
                });
            } else {
                window.mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: 'strict',
                    theme: 'base',
                    themeVariables: {
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        primaryColor: '#e7f2ef',
                        primaryTextColor: '#242923',
                        primaryBorderColor: '#087e79',
                        lineColor: '#718078',
                        secondaryColor: '#f6edda',
                        tertiaryColor: '#fffefa',
                        background: '#fffefa'
                    }
                });
                for (const diagram of diagrams) {
                    try {
                        const { svg, bindFunctions } = await window.mermaid.render(
                            `course-diagram-${++diagramId}`,
                            diagram.textContent
                        );
                        diagram.innerHTML = svg;
                        if (bindFunctions) bindFunctions(diagram);
                    } catch (error) {
                        console.error('Ders diyagramı oluşturulamadı:', error);
                        diagram.classList.add('diagram-error');
                        diagram.setAttribute('role', 'img');
                        diagram.setAttribute('aria-label', 'Bu diyagram görüntülenemedi. Kaynak metin aşağıda yer alıyor.');
                        diagram.insertAdjacentHTML('beforebegin', '<p class="visual-error">Bu diyagram görüntülenemedi; kaynak metin inceleme için gösteriliyor.</p>');
                    }
                }
            }
        }

        if (window.MathJax && window.MathJax.typesetPromise) {
            try {
                await window.MathJax.typesetPromise([content]);
            } catch (error) {
                console.error('Ders formülleri oluşturulamadı:', error);
                status.classList.add('lesson-error');
                status.textContent = 'Bazı formüller görüntülenemedi.';
            }
        }
    }

    async function loadMaterial(tab) {
        if (!content || !status || !title || !download) return;
        const request = ++activeRequest;
        materialTabs.forEach(materialTab => {
            const selected = materialTab === tab;
            materialTab.classList.toggle('active', selected);
            materialTab.setAttribute('aria-current', String(selected));
        });
        const file = tab.dataset.materialFile;
        title.textContent = tab.dataset.materialTitle;
        download.href = file;
        download.download = file.split('/').pop();
        content.innerHTML = '';
        status.classList.remove('lesson-error');
        status.textContent = 'Ders materyali yükleniyor…';

        try {
            const response = await fetch(file, { cache: 'no-store' });
            if (!response.ok) throw new Error(`Ders materyali yüklenemedi (${response.status}).`);
            const markdown = await response.text();
            if (request !== activeRequest) return;
            content.innerHTML = renderMarkdown(markdown);
            status.textContent = '';
            await renderVisuals();
        } catch (error) {
            if (request !== activeRequest) return;
            console.error('Ders materyali yüklenemedi:', error);
            status.classList.add('lesson-error');
            status.textContent = window.location.protocol === 'file:'
                ? 'Notları görüntülemek için siteyi bir yerel web sunucusu üzerinden aç. Markdown dosyasını yukarıdaki bağlantıdan indirebilirsin.'
                : 'Ders materyali yüklenemedi. Dosyanın yerinde olduğundan emin ol veya Markdown dosyasını indir.';
        }
    }

    materialTabs.forEach(tab => {
        tab.addEventListener('click', () => loadMaterial(tab));
    });

    document.querySelectorAll('.pdf-download').forEach(button => {
        button.addEventListener('click', () => {
            const originalTitle = document.title;
            const materialTitle = title ? title.textContent : '';
            document.title = materialTitle
                ? `Bilgisayar Bilimlerine Giriş - ${activeWeekNumber}. Hafta - ${materialTitle}`
                : `Bilgisayar Bilimlerine Giriş - ${activeWeekNumber}. Hafta`;
            window.addEventListener('afterprint', () => {
                document.title = originalTitle;
            }, { once: true });
            window.print();
        });
    });

    const nav = document.querySelector('.glass-nav');
    const progress = document.getElementById('scroll-progress');
    const mobileMenu = document.getElementById('mobile-menu');
    const openMenu = document.querySelector('.mobile-menu-btn');
    const closeMenu = document.querySelector('.mobile-menu-close');

    function setMenuOpen(isOpen) {
        mobileMenu.classList.toggle('open', isOpen);
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        openMenu.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    }

    openMenu.addEventListener('click', () => setMenuOpen(true));
    closeMenu.addEventListener('click', () => setMenuOpen(false));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    }, { passive: true });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-init').forEach(element => observer.observe(element));
    renderWeekCards();
    document.querySelectorAll('#week-grid .reveal-init').forEach(element => observer.observe(element));
    setupWeekPage();
});
