function ToggleBoxSlide(selector, opt = {}) {
    const self = this;
    self.defaultOption = {
        transition: 200,
        btnToggle: null,//'[data-button="toggle"]',
        btnOpen:  null,//'[data-button="open"]',
        btnClose:  null,//'[data-button="close"]',
        btnIndicatorOpen: '[data-indicator="button"]',
        btnIndicatorClose: '[data-indicator="button"]',
        btnIndicatorToggle: '[data-indicator="button"]',
        isOpen: false,
        transitionOpen: undefined,
        transitionClose: undefined,
        initialBtn: true
    }

    self.option = Object.assign(self.defaultOption,opt);

    self.buttonOpen = document.querySelector(self.option.btnOpen);
    self.buttonClose = document.querySelector(self.option.btnClose);

    if (typeof self.option.btnToggle == "string") {
        self.buttonToggle = document.querySelector(self.option.btnToggle);
    } else {
        self.buttonToggle = self.option.btnToggle;
    }

    self.indicatorOpen = null;
    self.indicatorClose = null;
    self.indicatorToggle = null;

    if (typeof selector == "string") {
        self.node = document.querySelector(selector);
    } else {
        self.node = selector;
    }

    self.nodeHeight = null;

    self.setHeightBox =  null;
    self.setStatusBox =  null;
    self.setCloseBox =  null;

    self.isOpen = function () {
        return self.option.isOpen;
    }

    self.init = function() {
        if (self.buttonToggle) {
            self.indicatorToggle = self.buttonToggle.querySelector(self.option.btnIndicatorToggle);
            self.indicatorToggle.style.transition = self.option.transition + "ms";
        }

        if (self.buttonOpen) {
            self.indicatorOpen = self.buttonOpen.querySelector(self.option.btnIndicatorOpen);
            self.indicatorOpen.style.transition = self.option.transition + "ms";
        }

        if (self.buttonClose) {
            self.indicatorClose = self.buttonClose.querySelector(self.option.btnIndicatorClose);
            self.indicatorClose.style.transition = self.option.transition + "ms";
        }

        self.node.style.display = "block";
        self.node.classList.add('beginOpenBox');
        self.node.style.transition = self.option.transition + "ms";
        self.nodeHeight = self.node.getBoundingClientRect().height;
        self.node.classList.add('toggleBox');
        self.node.classList.remove('beginOpenBox');
        self.node.style.display = "none";

        return self.nodeHeight;
    }

    self.openBox = function () {
        clearTimeout(self.setCloseBox);

        self.node.style.display = "block";

        self.setHeightBox = setTimeout(() => {
            self.node.style.height = self.nodeHeight + "px";
        }, 10);

        self.setStatusBox = setTimeout(() => {
            self.option.isOpen = true;
        }, self.option.transition);

        if (typeof self.option.transitionOpen == "function" ){
            try {
                self.option.transitionOpen();
            } catch (e) {
                console.error(e);
            }
        } else {
            if (self.option.transitionOpen !== null && self.option.transitionOpen !== undefined) {
                console.error(self.option.transitionOpen,' : is not a function');
            }
        }
    }

    self.closeBox = function () {
        self.node.style.height = "0";

        clearTimeout(self.setHeightBox);
        clearTimeout(self.setStatusBox);

        self.setCloseBox = setTimeout(() => {
            self.node.style.display = "none";
            self.option.isOpen = false;
        }, self.option.transition);

        if (typeof self.option.transitionClose == "function" ){
            try {
                self.option.transitionClose();
            } catch (e) {
                console.error(e);
            }
        } else {
            if (self.option.transitionClose !== null && self.option.transitionClose !== undefined) {
                console.error(self.option.transitionClose,' : is not a function');
            }
        }
    }

    self.indicatorStatusOpen = function () {
        if (self.indicatorToggle) {
            self.indicatorToggle.classList.add('statusOpen');
        }

        if (self.indicatorOpen) {
            self.indicatorOpen.classList.add('statusOpen');
        }

        if (self.indicatorClose) {
            self.indicatorClose.classList.remove('statusOpen');
        }
    }

    self.indicatorStatusClose = function () {
        if (self.indicatorToggle) {
            self.indicatorToggle.classList.remove('statusOpen');
        }

        if (self.indicatorOpen) {
            self.indicatorOpen.classList.remove('statusOpen');
        }

        if (self.indicatorClose) {
            self.indicatorClose.classList.add('statusOpen');
        }
    }

    if (self.buttonToggle && self.option.initialBtn) {
        self.buttonToggle.addEventListener('click', () => {
            if (self.option.isOpen === false) {
                self.openBox();
                self.indicatorStatusOpen();
            } else {
                self.closeBox();
                self.indicatorStatusClose();
            }
        });
    }

    if (self.buttonOpen && self.option.initialBtn) {
        self.buttonOpen.addEventListener('click', () => {
            self.openBox();
            self.indicatorStatusOpen();
        });
    }

    if (self.buttonClose && self.option.initialBtn) {
        self.buttonClose.addEventListener ('click', () => {
            self.closeBox();
            self.indicatorStatusClose();
        });
    }

    self.init();

    return {
        isOpen: self.isOpen,
        open: () => {
            self.openBox();
            self.indicatorStatusOpen();
        },
        close: () => {
            self.closeBox();
            self.indicatorStatusClose();
        },
    }
}

//
//Global transition for animation
const transitionAnimation = 300;

const orderInfoSubstrate = document.querySelector('[data-substrate="order-info"]');

if (orderInfoSubstrate && document.querySelector('.m-order-info')) {
    const orderInfo = new ToggleBoxSlide('.m-order-info', {
        transition: transitionAnimation,
        btnToggle: '[data-button="order-info"]',
        transitionOpen: () => {
            orderInfoSubstrate.style.display = "block";
            orderInfoSubstrate.style.animation = "openBox " + transitionAnimation + "ms linear forwards";
        },
        transitionClose: () => {
            orderInfoSubstrate.style.animation = "closeBox " + transitionAnimation + "ms linear forwards";
            setTimeout(() => {orderInfoSubstrate.style.display = "none";}, transitionAnimation)
        }
    });
}

const selectList = document.querySelectorAll('.m-select');

if (selectList.length) {
    for (let i = 0; i < selectList.length; i++) {
        selectList[i].btn = selectList[i].querySelector('[data-button="toggle"]');
        selectList[i].box = selectList[i].querySelector('.m-select__dropdown');

        selectList[i].sel = new ToggleBoxSlide(selectList[i].box, {
            transition: transitionAnimation,
            btnToggle: selectList[i].btn,
            transitionOpen: () => {
                selectList[i].style.zIndex = "1";
            },
            transitionClose: () => {
                setTimeout(() => {
                    selectList[i].style.zIndex = "0";
                }, transitionAnimation);
            },
            initialBtn: false
        })
    }

    for(let i = 0; i < selectList.length; i++) {
        selectList[i].btn.addEventListener('click', (e) => {
            let active = false;

            if (selectList[i].sel.isOpen()) {
                selectList[i].sel.close();
            } else {
                for(let k = 0; k < selectList.length; k++) {
                    if (selectList[k].sel.isOpen()) {
                        selectList[k].sel.close();
                        active = true;
                    }
                }

                if (active) {
                    setTimeout(() => {selectList[i].sel.open();}, transitionAnimation);
                } else {
                    selectList[i].sel.open();
                }

            }
        })
    }
}

$('.m-button-menu').on('click', function () {
    $(this).next('.m-menu-list').slideToggle(200);
    $(this).find('.m-button-menu__icon').toggleClass('statusOpen');
})

$('.m-filter-box__hold').on('click', function () {
    $(this).next('.m-filter-list').slideToggle(200);
    $(this).find('.m-filter-box__indicator').toggleClass('statusOpen');
})

$('.m-header__hamburger').on('click', function () {
    $('[data-popup="main-menu"]').fadeIn();
});

$('[data-close="main-menu"]').on('click', function () {
    $('[data-popup="main-menu"]').fadeOut();
});

$('.m-button-filter').on('click', function () {
    $('[data-popup="filter"]').fadeIn();
});

$('[data-close="filter"]').on('click', function () {
    $('[data-popup="filter"]').fadeOut();
});

$('.m-button-add-order').on('click', function () {
    $('[data-popup="add_goods"]').fadeIn();
});

$('[data-close="add_goods"]').on('click', function () {
    $('[data-popup="add_goods"]').fadeOut();
});



//scaner
// function onScanSuccess(decodedText, decodedResult) {
//     // handle the scanned code as you like, for example:
//     console.log(`Code matched = ${decodedText}`, decodedResult);
// }
//
// function onScanFailure(error) {
//     // handle scan failure, usually better to ignore and keep scanning.
//     // for example:
//     console.warn(`Code scan error = ${error}`);
// }
//
// let html5QrcodeScanner = new Html5QrcodeScanner(
//     "reader",
//     { fps: 10, qrbox: {width: 250, height: 250} },
//     /* verbose= */ false);
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);


let resultContainer = document.getElementById('qr-reader-results');
let lastResult;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {

        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(`Scan result ${decodedText}`, decodedResult);

        resultContainer.innerHTML = decodedResult.result.format.formatName + " " + decodedResult.result.text;
    }
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 30, qrbox: {width: 250, height: 250} }, false);
html5QrcodeScanner.render(onScanSuccess);


//open search
$('.m-button-search').on('click', function () {
    $('.m-search').slideToggle('200', function () {
        $('.m-main').toggleClass('m-main_search');
    });
});

//m-search-button
$('.m-search-button').on('click', function () {
    $(this).toggleClass('-active__').siblings('.m-search-button').fadeToggle('200');

    $('.m-search__input').toggleClass('-active').focus();
});

//m-search-button
$('[data-search="scanner"]').on('click', function () {
    $('[data-popup="scanner"]').fadeToggle('200');
});

//Search voice
function mobileSearchVoice() {
    const field = document.querySelector('.m-search__input');
    const btn = document.querySelector('[data-search="voice"]');
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let isTextField = false;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (e) => {
        field.value = e.results[0][0].transcript;

        if(e.results[0].isFinal) {
            isTextField = true;
        }
    });

    btn.addEventListener('click', () => {
        field.value = "Говорите...";
        isTextField = false;
        recognition.start();
    })

    recognition.addEventListener('end', () => {
        if (!isTextField) {
            field.value = "";
        }
    })
}

mobileSearchVoice();