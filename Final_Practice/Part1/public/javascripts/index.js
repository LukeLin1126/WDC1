// eslint-disable-next-line no-undef
let vueinst = new Vue({
    el : '#vue_selector',
    data(){
        return {
            tableKey: 0,
            listLoading: true,
            myData: [{
                room_id: 0,
                size: 0,
                facilities: "",
                name: "",
                description: "",
                street_address: "",
                booked_by: ''

            }],
            listQuery: {
                facilities: '',
                size: '',
                rating: '',
                date: ''
            },
            flag: 'true',
            searchOptions: [{
                value: 'false',
                label: 'Or Search'
            },{
                value: 'true',
                label: 'And Search'
            }]

        };
    },created(){
        this.getList();
    }
    ,methods: {
        fetchRoomList(){
            // eslint-disable-next-line no-undef
            return axios.post('/search', {
                facilities: this.listQuery.facilities,
                size: this.listQuery.size,
                rating: this.listQuery.rating,
                date: this.listQuery.date
            }, {
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    flag: this.flag
                }
            });
        },
        getList(){
            this.listLoading = true;
            this.fetchRoomList().then(response => {
                this.myData = response.data;

                setTimeout(() => {
                    this.listLoading = false;
                }, 1000);
            });
        }
    }
});

//
// [
//     {
//         "room_id": 6,
//         "size": 3,
//         "facilities": "Wifi,balcony",
//         "name": "Standard Room D",
//         "description": "A great room for 4 people",
//         "street_address": "421 King William St",
//         "booked_by": "Akide_Liu3"
//     }
// ]
