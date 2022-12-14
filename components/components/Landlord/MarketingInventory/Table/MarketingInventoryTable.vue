<template>
    <div class="table--marketing-inventory">
        <table class="table--responsive">
            <thead>
                <tr>
                    <th id="property">Property</th>
                    <th id="unit">Unit No.</th>
                    <th id="address">Address</th>
                    <th id="relationship">Relationship Manager</th>
                    <th id="listed">Listed Since</th>
                    <th id="rent">Asking Rent</th>
                    <th id="price">Asking Price</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="items.length > 0">
                    <tr v-for="item in items" :key="item.id">
                        <td headers="property" data-title="Property">
                            <div>
                                <img :src="item.img" class="image" alt="" />
                                <span>{{ item.title }}</span>
                            </div>
                        </td>
                        <td headers="unit" data-title="Unit No.">
                            <p>{{ item.unit }}</p>
                        </td>
                        <td headers="address" data-title="Address">
                            <p class="address">{{ item.address }}</p>
                        </td>
                        <td headers="relationship" data-title="Relationship Manager">
                            <p>
                                {{ item.relationshipName }} <br />{{ item.relationshipPhoneNumber }}
                            </p>
                        </td>

                        <td headers="listed" data-title="Listed Since">
                            <p>{{ item.listSince }}</p>
                        </td>
                        <td headers="rent" data-title="Asking Rent">
                            <div class="currency">
                                <p>{{ item.currency }} {{ formatPrice(item.rentPrice) }}</p>
                            </div>
                        </td>
                        <td headers="price" data-title="Asking Price">
                            <div class="currency">
                                <p>{{ item.currency }} {{ formatPrice(item.price) }}</p>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="7"> <p class="empty">No record found.</p> </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "MarketingInventoryTable",
    data() {
        return {
            items: [
                {
                    img: "https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw",
                    title: "lloyd sixtyfive",
                    unit: "10-24",
                    address: "65 Lloyd Road, Singapore 239114",
                    relationshipName: "Wu Chie Ha",
                    relationshipPhoneNumber: "+65 96157959",
                    listSince: "06/2001",
                    // rent: "SGD 4.000", // currency
                    currency: "SGD",
                    rentPrice: 4000,
                    price: 5000000
                    //price: "SGD 5.000.000", // price 50000000 => 5.000.000,00
                },
                {
                    img: "https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw",
                    title: "Skypark @ Somerset",
                    unit: "10-24",
                    address: "65 Lloyd Road, Singapore 239114",
                    relationshipName: "Wu Chie Ha",
                    relationshipPhoneNumber: "+65 96157959",
                    listSince: "06/2001",
                    currency: "SGD",
                    rentPrice: 4000,
                    price: 5000000
                },
                {
                    img: "https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw",
                    title: "Waterfront Bungalow at Ocean Drive",
                    unit: "10-24",
                    address: "65 Lloyd Road, Singapore 239114",
                    relationshipName: "Wu Chie Ha",
                    relationshipPhoneNumber: "+65 96157959",
                    listSince: "06/2001",
                    currency: "SGD",
                    rentPrice: 4000,
                    price: 5000000
                },
                {
                    img: "https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw",
                    title: "lloyd sixtyfive",
                    unit: "10-24",
                    address: "65 Lloyd Road, Singapore 239114",
                    relationshipName: "Wu Chie Ha",
                    relationshipPhoneNumber: "+65 96157959",
                    listSince: "06/2001",
                    currency: "SGD",
                    rentPrice: 4000,
                    price: 5000000
                }
            ]
        }
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace(".")
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>

<style lang="scss" scoped>
.table--marketing-inventory {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0;
    right: 0;
    top: 3.2rem;
    bottom: 0;

    thead {
        tr {
            position: relative;
        }

        th {
            padding: 1.5rem 1.6rem 1.5rem;
            background: #00634f;
            font-family: "Nunito";
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height, or 150% */
            color: #ffffff;
        }
    }

    tbody {
        tr {
            position: relative;
            vertical-align: top;
        }

        tr:nth-child(even) {
            background: #e5e5e5;
        }

        td {
            padding: 1.3rem 1.7rem 2.9rem;
            border-bottom: 1px solid #e5e5e5;

            .image {
                // padding-bottom: 64%;
                position: relative;
                width: 10rem;
                height: 6.4rem;
                border-radius: 6px;

                img {
                    border: 1px solid #e5e5e5;
                    width: fit-content;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    z-index: 1;
                    left: 0;
                }
            }

            span {
                padding-top: 1.2rem;
                display: flex;
                justify-content: left;
                font-family: "Nunito";
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;

                max-width: 16.4rem;
                /* 26A0F6 cyan */
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                // line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                color: #26a0f6;
            }

            p {
                padding-top: 9px;
                display: flex;
                justify-content: left;
                font-family: "Nunito";
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                /* or 150% */

                /* 0B0C0C paragraph txt */

                color: #0b0c0c;
            }

            .currency {
                display: flex;
                p {
                    white-space: nowrap;
                }
                //
            }
            .address {
                max-width: 20.6rem;
            }
        }
    }

    @media screen and (max-width: 1024px) {
        thead {
            tr {
                position: relative;
            }

            th {
                padding: 1.5rem 1.6rem 1.5rem;
                background: #00634f;
                font-family: "Nunito";
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                color: #ffffff;
            }
        }

        tbody {
            tr {
                position: relative;
                vertical-align: top;
            }

            tr:nth-child(even) {
                background: #e5e5e5;
            }

            td {
                padding: 1.3rem 1.7rem 2.9rem;
                border-bottom: 1px solid #e5e5e5;
                span {
                    padding-top: 1.2rem;
                    display: flex;
                    justify-content: left;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 24px;
                    // text-decoration-line: underline;
                    // white-space: nowrap;
                    max-width: 16.4rem;
                    /* 26A0F6 cyan */
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    // line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: #26a0f6;
                }

                p {
                    padding-top: 9px;
                    display: flex;
                    justify-content: left;
                    font-family: "Nunito";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #0b0c0c;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .table--marketing-inventory {
            display: flex;
            align-items: center;
            position: relative;
            left: 0;
            right: 0;
            top: 3.2rem;
            bottom: 0;
        }
        tr,
        td,
        th,
        thead,
        tbody,
        table {
            display: block;
        }
        thead {
            display: none;
        }
        tbody tr {
            border-bottom: 0;
        }
        tbody tr:nth-child(even) {
            background: #fafafa;
        }
        tbody tr td {
            border-bottom: 1px solid #e5e5e5;
            padding: 0.5rem;
            display: flex;
            position: relative;
        }
        tbody tr td::before {
            content: attr(data-title);
            display: flex;
            // justify-content: center;
            align-items: center;
            width: 40%;
            min-width: 10rem;
            margin-right: 1rem;
            padding-right: 1rem;
            font-weight: 700;
            vertical-align: top;
            font-size: 14px;
        }
        // tbody tr td::after {
        //     content: "";
        //     background-color: #e8e8e8;
        // }
    }
}
</style>
