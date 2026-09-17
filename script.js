// =====================================
// HEADER
// =====================================

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    if (
        window.scrollY > 50 ||
        header.classList.contains("internal-header")
    ) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();



// =====================================
// MENÚ MÓVIL
// =====================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

        if (nav.classList.contains("mobile-open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

            document.body.style.overflow = "";

        });

    });

}



// =====================================
// ANIMACIONES
// =====================================

const revealElements =
    document.querySelectorAll(".reveal");


const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (reduceMotion) {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

} else {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}



// =====================================
// CONTADORES
// =====================================

const numberElements =
    document.querySelectorAll("[data-target]");


if (numberElements.length > 0) {

    const numberObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const element =
                        entry.target;


                    const target =
                        Number(
                            element.dataset.target
                        );


                    const suffix =
                        element.dataset.suffix || "";


                    const duration = 1000;

                    const start =
                        performance.now();


                    function animate(currentTime) {

                        const progress =
                            Math.min(
                                (currentTime - start) /
                                duration,
                                1
                            );


                        const value =
                            Math.floor(
                                progress * target
                            );


                        element.textContent =
                            value + suffix;


                        if (progress < 1) {

                            requestAnimationFrame(
                                animate
                            );

                        } else {

                            element.textContent =
                                target + suffix;

                        }

                    }


                    requestAnimationFrame(
                        animate
                    );


                    numberObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    numberElements.forEach(element => {

        numberObserver.observe(element);

    });

}



// =====================================
// FORMULARIO → WHATSAPP
// =====================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document.getElementById("nombre").value.trim();


            const empresa =
                document.getElementById("empresa").value.trim();


            const telefono =
                document.getElementById("telefono").value.trim();


            const interes =
                document.getElementById("interes").value;


            const mensaje =
                document.getElementById("mensaje").value.trim();


            const texto =
`Hola NEXO Capital, me gustaría iniciar una conversación.

Nombre: ${nombre}
Empresa: ${empresa || "No especificada"}
Teléfono: ${telefono}
Motivo: ${interes}

Proyecto / oportunidad:
${mensaje}`;


            /*
            NÚMERO DEMO

            Cambia este número cuando tengas
            el WhatsApp real del cliente.

            Formato:
            código de país + número
            sin espacios ni símbolos.
            */

            const numero =
                "524420000000";


            const whatsappURL =
                `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}