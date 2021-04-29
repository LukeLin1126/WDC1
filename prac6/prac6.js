/*

Top menu (task 1.5):

{ title:'Home',         url:'/' }
{ title:'About',        url:'/about' }
{ title:'Contact Us',   url:'/contact' }


Top menu 2 (task 1.7):

{ title:'Home', url:'/', submenus: [] }
{ title:'About', url:'/about',
    submenus: [
        { title:'Who we are',   url:'/about#us' },
        { title:'What we do',   url:'/about#store' },
        { title:'Our range',     url:'/about#range' }
    ]
}
{ title:'Contact Us',   url:'/contact',
    submenus: [
        { title:'Information',   url:'/contact#info' },
        { title:'Returns',   url:'/contact#return' },
        { title:'Locate Us',     url:'/contact#locate' }
    ]
}


Stores (task 1.8):

{ name:'Adelaide City',  address:'45 Florabunda Lane, Adelaide, 5000', counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg/320px-11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg' },
{ name:'Steelton South', address:'77 Weigall Avenue, Steelton, 5413',  counter: 0, img:'https://upload.wikimedia.org/wikipedia/commons/4/42/Well-shop-front.jpg' },
{ name:'Milton',         address:'33 McGregor Street, Milton, 5880',   counter: 0, img:'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Greggs_store_front.JPG/320px-Greggs_store_front.JPG' }

*/

const SPECIALS = [
    { name:'Salt', price:'$0.99', url:'https://live.staticflickr.com/22/27476159_922598f0f5_b.jpg' },
    { name:'Pepper', price:'$2.49', url:'https://live.staticflickr.com/191/449547916_ce1c87adeb_b.jpg' },
    { name:'Tomato Sauce', price:'$3.50', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Fresh_Tomato_Sauce_%28Unsplash%29.jpg/640px-Fresh_Tomato_Sauce_%28Unsplash%29.jpg' },
    { name:'Worchestershire Sauce', price:'$4.20', url:'https://upload.wikimedia.org/wikipedia/commons/4/4c/Worcester_Sauce_001.jpg' }
];



// eslint-disable-next-line no-undef
var vueinst = new Vue({
    el: '#app',
    data() {
        return {
            message: 'Hello Vue!',
            // task 1-1
            choose: 'Choose ...',
            // task 1-2
            special: SPECIALS[0],
            show_ad: true,
            // task 1-4
            dark_mode: false,
            // task 1-5
            top_menu: [
                {title: 'Home', url: '/', submenus: []},
                {
                    title: 'About', url: '/about',
                    submenus: [
                        {title: 'Who we are', url: '/about#us'},
                        {title: 'What we do', url: '/about#store'},
                        {title: 'Our range', url: '/about#range'}
                    ]
                },
                {
                    title: 'Contact Us', url: '/contact',
                    submenus: [
                        {title: 'Information', url: '/contact#info'},
                        {title: 'Returns', url: '/contact#return'},
                        {title: 'Locate Us', url: '/contact#locate'}
                    ]
                }
            ],
            // task 1-6
            c_text: 'type your comment here',
            c_arr: [],

            // task 1-7
            // the index of top menu array
            top_menu_item: 0,
            top_menu_hover: false,

            // task 1-8
            s_arr: [
                {
                    name: 'Adelaide City',
                    address: '45 Florabunda Lane, Adelaide, 5000',
                    counter: 0,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg/320px-11_Gloddaeth_Street%2C_Llandudno_shop_front.jpg'
                },
                {
                    name: 'Steelton South',
                    address: '77 Weigall Avenue, Steelton, 5413',
                    counter: 0,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Well-shop-front.jpg'
                },
                {
                    name: 'Milton',
                    address: '33 McGregor Street, Milton, 5880',
                    counter: 0,
                    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Greggs_store_front.JPG/320px-Greggs_store_front.JPG'
                }],


            search_string: '',
            search_result: [],

        };
    },

    // https://medium.com/notonlycss/the-difference-between-computed-and-methods-in-vue-js-9cb05c59ed98
    computed: {

        // task 1-4
        dark_mode_func : function (){
            return {
                'app_dark_mode' : this.dark_mode,
            };
        },
        dark_mode_button_func_off: function () {
            return {
                'pure-button-active': !this.dark_mode
            };
        },
        dark_mode_button_func_on: function () {
            return {
                'pure-button-active': this.dark_mode,
                'pure-button-primary': this.dark_mode
            };
        },
    },
    methods:{
        // task 1-6
        comments_func: function () {
            this.c_arr.push(this.c_text);
        },
        // task 1-7
        sub_menu_func: function (index) {
            this.top_menu_hover = true;
            this.top_menu_item = index;
        },
        search: function (search_string) {

            // eslint-disable-next-line no-undef
            axios.get("/items?q=" + search_string)
                .then((response) => {
                    this.search_result = response.data;
                });

            // console.log(this.search_result);
        }

    },
    watch: {

    }
});
