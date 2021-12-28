function ToggleBoxSlide(selector, opt = {}) {
    const self = this;
    self.defaultOption = {
        transition: 200,
        btnToggle: '[data-button="toggle"]',
        btnOpen: '[data-button="open"]',
        btnClose: '[data-button="close"]',
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
                openBox();
                indicatorStatusOpen();
            } else {
                closeBox();
                indicatorStatusClose();
            }
        });
    }

    if (self.buttonOpen && self.option.initialBtn) {
        self.buttonOpen.addEventListener('click', () => {
            openBox();
            indicatorStatusOpen();
        });
    }

    if (self.buttonClose && self.option.initialBtn) {
        self.buttonClose.addEventListener ('click', () => {
            closeBox();
            indicatorStatusClose();
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

const transitionAnimation = 300;
const orderInfoSubstrate = document.querySelector('[data-substrate="order-info"]');

if (orderInfoSubstrate && document.querySelector('.order-info')) {
    const orderInfo = new ToggleBoxSlide('.order-info', {
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

// orderInfo.open();

const selectList = document.querySelectorAll('.select');

if (selectList.length) {
    for (let i = 0; i < selectList.length; i++) {
        selectList[i].btn = selectList[i].querySelector('.select__text');
        selectList[i].box = selectList[i].querySelector('.select__dropdown');

        selectList[i].select = new ToggleBoxSlide(selectList[i].box, {
            transition: transitionAnimation,
            btnToggle: selectList[i].btn,
            transitionOpen: () => {
                selectList[i].style.zIndex = "1";
            },
            transitionClose: () => {
                setTimeout(() => {selectList[i].style.zIndex = "0";}, transitionAnimation);
            },
            initialBtn: false
        })
    }

    for(let i = 0; i < selectList.length; i++) {
        selectList[i].btn.addEventListener('click', (e) => {
            let active = false;

            if (selectList[i].select.isOpen()) {
                selectList[i].select.close();
            } else {
                for(let k = 0; k < selectList.length; k++) {
                    if (selectList[k].select.isOpen()) {
                        selectList[k].select.close();
                        active = true;
                    }
                }

                if (active) {
                    setTimeout(() => {selectList[i].select.open();}, transitionAnimation);
                } else {
                    selectList[i].select.open();
                }

            }
        })
    }
}