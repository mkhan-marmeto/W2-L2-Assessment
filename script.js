document.addEventListener('DOMContentLoaded', function () {


    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const header = document.querySelector('header');
            const productDataContainer = document.querySelector('.product-data');
            const splideList = document.getElementById('splide-list');

            const logoDiv = document.createElement('div');
            logoDiv.id = 'logo-container';
            logoDiv.classList.add('logo-wrapper');

            const logoImg = document.createElement('img');
            logoImg.src = data.header.logo;
            logoImg.id = 'logo-image';
            logoImg.classList.add('logo');
            logoDiv.appendChild(logoImg);

            header.appendChild(logoDiv);

            const navLinks = document.createElement('div');
            navLinks.classList.add('nav-links');

            const links = data.header.links;
            for (const [key, url] of Object.entries(links)) {
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.textContent = key.replace('_', ' ').toUpperCase();
                navLinks.appendChild(anchor);
            }

            header.appendChild(navLinks);

            if (data.header.button) {
                const button = document.createElement('button');
                button.classList.add('header-button');
                button.textContent = 'Sign up';
                header.appendChild(button);
            }

            data.products.forEach(product => {
                const slide = document.createElement('div');
                slide.className = 'splide__slide';

                const slideImg = document.createElement('img');
                slideImg.src = product.image;
                slideImg.alt = product.description;

                slide.appendChild(slideImg);
                splideList.appendChild(slide);
            });

            const splide = new Splide('.splide', {
                type: 'loop',
                perPage: 1,
                autoplay: false,
                breakpoints: {
                    600: {
                        height: 200,
                    }
                },
                pagination: false,
                arrows: true,
            }).mount();

            const displayProductData = (product) => {
                productDataContainer.innerHTML = `
                    <h1 class="title1">${product.uppertext}</h1>
                    <h2 class="title2">${product.lowertext}</h2>
                    <p class="product-description">${product.description}</p>
                    <h1 id="product-price">${product.price}</h1>
                `;
                document.body.style.background = product.ambient_color;
                productDataContainer.classList.add('show');
            };

            const firstProduct = data.products[0];
            displayProductData(firstProduct);

            splide.on('move', (newIndex) => {
                const currentProduct = data.products[newIndex];
                productDataContainer.classList.remove('show');
                setTimeout(() => displayProductData(currentProduct), 500);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


