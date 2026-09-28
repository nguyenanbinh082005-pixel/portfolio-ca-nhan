// =========================================================
// 1. LẤY CÁC PHẦN TỬ HTML
// =========================================================

const body = document.body;

const header = document.getElementById("header");

const themeToggle = document.getElementById("themeToggle");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");



// =========================================================
// 2. HIỂN THỊ NĂM HIỆN TẠI
// =========================================================

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}



// =========================================================
// 3. DARK MODE / LIGHT MODE
// =========================================================

function updateThemeIcon() {

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("i");

    if (!icon) return;


    if (body.classList.contains("light-theme")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "title",
            "Chuyển sang giao diện tối"
        );

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "title",
            "Chuyển sang giao diện sáng"
        );
    }
}


// Kiểm tra giao diện đã lưu

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    body.classList.add("light-theme");

}


// Cập nhật icon

updateThemeIcon();


// Khi click nút theme

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "light-theme"
            );


            const isLight =
                body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "portfolio-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();
        }
    );

}



// =========================================================
// 4. MOBILE MENU
// =========================================================

if (mobileMenuButton && navMenu) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "open"
            );


            const icon =
                mobileMenuButton.querySelector("i");


            if (
                navMenu.classList.contains(
                    "open"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}



// Đóng menu khi chọn một mục

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            if (!navMenu) return;

            navMenu.classList.remove(
                "open"
            );


            if (mobileMenuButton) {

                const icon =
                    mobileMenuButton
                        .querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );
            }

        }
    );

});



// =========================================================
// 5. HEADER KHI CUỘN TRANG
// =========================================================

function handleHeaderScroll() {

    if (!header) return;


    if (window.scrollY > 40) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();



// =========================================================
// 6. ACTIVE MENU THEO SECTION
// =========================================================

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNav() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();



// =========================================================
// 7. NÚT QUAY LÊN ĐẦU TRANG
// =========================================================

function handleBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}

window.addEventListener(
    "scroll",
    handleBackToTop
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}



// =========================================================
// 8. HIỆU ỨNG XUẤT HIỆN KHI CUỘN
// =========================================================

// Thêm class reveal cho những phần tử muốn
// xuất hiện khi người dùng cuộn tới.

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".info-card, " +
        ".value-card, " +
        ".skill-card, " +
        ".timeline-item, " +
        ".project-card, " +
        ".goal-card, " +
        ".contact-info, " +
        ".contact-form-card"
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

    }
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



// =========================================================
// 9. LỌC DỰ ÁN
// =========================================================

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                // Xóa trạng thái active
                filterButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Active nút hiện tại
                button.classList.add(
                    "active"
                );


                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                projectCards.forEach(
                    (card) => {

                        const category =
                            card.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);



// =========================================================
// 10. DỮ LIỆU CHI TIẾT DỰ ÁN
// =========================================================

const projectData = {

    portfolio: {

        title:
            "Website giới thiệu bản thân",

        category:
            "Website",

        icon:
            "fa-solid fa-user",

        description:
            "Đây là website portfolio cá nhân được xây dựng nhằm giới thiệu thông tin cá nhân, quá trình học tập, kỹ năng, dự án và định hướng nghề nghiệp. Website sử dụng HTML, CSS và JavaScript, đồng thời được thiết kế responsive để có thể hiển thị trên máy tính và điện thoại.",

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ]

    },


    education: {

        title:
            "Website hỗ trợ học tập",

        category:
            "Giáo dục",

        icon:
            "fa-solid fa-book-open",

        description:
            "Đây là ý tưởng dự án hướng tới việc xây dựng một không gian học tập trực tuyến đơn giản. Nội dung có thể được phân chia theo môn học, chủ đề và tài liệu, giúp người học dễ dàng tìm kiếm và theo dõi nội dung.",

        tech: [
            "HTML",
            "CSS",
            "UI/UX",
            "Educational Technology"
        ]

    },


    programming: {

        title:
            "Bài tập lập trình",

        category:
            "Lập trình",

        icon:
            "fa-solid fa-terminal",

        description:
            "Nhóm các bài thực hành lập trình được thực hiện trong quá trình học tập. Nội dung tập trung vào tư duy thuật toán, cấu trúc chương trình, xử lý dữ liệu và giải quyết các bài toán cơ bản.",

        tech: [
            "C/C++",
            "C#",
            "SQL",
            "Algorithm"
        ]

    }

};



// =========================================================
// 11. PROJECT MODAL
// =========================================================

const projectModal =
    document.getElementById(
        "projectModal"
    );

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalIcon =
    document.getElementById(
        "modalIcon"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalTech =
    document.getElementById(
        "modalTech"
    );


const detailButtons =
    document.querySelectorAll(
        ".project-detail-button"
    );


// Hàm mở modal

function openProjectModal(
    projectKey
) {

    const project =
        projectData[projectKey];


    if (!project || !projectModal) {
        return;
    }


    modalTitle.textContent =
        project.title;


    modalCategory.textContent =
        project.category;


    modalDescription.textContent =
        project.description;


    // Icon

    modalIcon.innerHTML =
        `<i class="${project.icon}"></i>`;


    // Công nghệ

    modalTech.innerHTML = "";


    project.tech.forEach(
        (tech) => {

            const tag =
                document.createElement(
                    "span"
                );

            tag.textContent = tech;

            modalTech.appendChild(
                tag
            );

        }
    );


    projectModal.classList.add(
        "show"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "no-scroll"
    );

}



// Hàm đóng modal

function closeProjectModal() {

    if (!projectModal) return;


    projectModal.classList.remove(
        "show"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "no-scroll"
    );

}



// Click nút xem chi tiết

detailButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const projectKey =
                    button.getAttribute(
                        "data-project"
                    );


                openProjectModal(
                    projectKey
                );

            }
        );

    }
);


// Nút X

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


// Click bên ngoài modal

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}


// Nhấn ESC để đóng

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

        }

    }
);



// =========================================================
// 12. FORM LIÊN HỆ
// =========================================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            // Không reload trang
            event.preventDefault();


            if (!formMessage) return;


            formMessage.className =
                "form-message show success";


            formMessage.textContent =
                "Đã nhận nội dung mẫu. Form hiện đang chạy ở chế độ demo và chưa kết nối máy chủ gửi email.";


            // Xóa dữ liệu form
            contactForm.reset();


            // Tự ẩn thông báo sau 5 giây
            setTimeout(
                () => {

                    formMessage.classList.remove(
                        "show"
                    );

                },
                5000
            );

        }
    );

}



// =========================================================
// 13. SMOOTH SCROLL CHO LINK
// =========================================================

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 70;


                const targetPosition =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);



// =========================================================
// 14. ANIMATION NHẸ CHO HERO
// =========================================================

const heroImage =
    document.querySelector(
        ".hero-image-card"
    );


if (heroImage) {

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) return;


            window.requestAnimationFrame(
                () => {

                    const scrollY =
                        window.scrollY;


                    if (
                        window.innerWidth >
                        768
                    ) {

                        const movement =
                            Math.min(
                                scrollY * 0.04,
                                25
                            );


                        heroImage.style.transform =
                            `rotate(2deg) translateY(${movement}px)`;

                    }


                    ticking = false;

                }
            );


            ticking = true;

        }
    );

}



// =========================================================
// 15. KIỂM TRA ẢNH AVATAR
// =========================================================

const avatar =
    document.querySelector(
        ".hero-image"
    );


if (avatar) {

    avatar.addEventListener(
        "error",
        () => {

            avatar.src =
                "https://placehold.co/600x700/111827/ffffff?text=Nguyen+An+Binh";

        }
    );

}



// =========================================================
// 16. HOÀN TẤT
// =========================================================

console.log(
    "Portfolio của Nguyễn An Bình đã được tải thành công."
);