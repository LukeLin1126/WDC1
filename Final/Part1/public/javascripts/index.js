// eslint-disable-next-line no-undef
let vueinst = new Vue({
    el: '#vue_container',
    data() {
        return {
            postData: {
                category: '',
                platform: '',
                features: '',
                price_start : '',
                price_end: ''
            },
            list : [{
                game_id: '',
                game_name: '',
                category: '',
                platform: '',
                features: '',
                price: '',
                category_name: '',
                category_description: '',
                platform_name: '',
                platform_description: ''
            }],
            search_flag: [
                {
                    display: 'And search',
                    value: 'true',
                },
                {
                    display: 'OR search',
                    value: 'false',
                }
            ],
            post_flag: 'true',
            total : '',
            list_element_style1: 'style1'
        };
    },
    created(){
        this.getList();
    },
    methods: {
        fetchGameList(){
            // eslint-disable-next-line no-undef
            return axios.post('/search', {
                category: this.postData.category,
                platform: this.postData.platform,
                features: this.postData.features,
                price_start: this.postData.price_start,
                price_end: this.postData.price_end
            }, {
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    flag: this.post_flag
                }
            });
        },
        getList(){
            this.fetchGameList().then(response => {
                this.list = response.data.data;
                this.total = response.data.total;
            });
        }
    }
});
