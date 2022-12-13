<template lang="html">
    <div class="v-data-table">
        <table class="v-table">
            <thead>
                <tr>
                    <th>Property Name</th>
                    <th>Unit No.</th>
                    <th>Purchase Date</th>
                    <th>Purchase Price</th>
                    <th>Current Estimated Value</th>
                    <th>Estimated Capital Gain</th>
                    <th>Rental Yield</th>
                </tr>
            </thead>
            <tbody>
                <template>
                    <tr v-for="item in items" :key="item">
                        <td>
                            {{ item.propertyName }}
                        </td>
                        <td>
                            {{ item.unitNo }}
                        </td>
                        <td>
                            {{ item.purchaseDate }}
                        </td>
                        <td>
                            {{ item.purchasePrice }}
                        </td>
                        <td>
                            {{ item.currentEstimatedValue }}
                        </td>
                        <td>
                            {{ item.estimatedCapitalGain }}
                        </td>
                        <td>
                            {{ item.rentalYield }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "08-10",
                    purchaseDate: "26/11/2022",
                    purchasePrice: "SGD 1,200,000",
                    currentEstimatedValue: "SGD 1,500,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "1.2%"
                },
                {
                    propertyName: "Skypark @ Somerset",
                    unitNo: "02-96",
                    purchaseDate: "05/02/2021",
                    purchasePrice: "SGD 1,000,000",
                    currentEstimatedValue: "SGD 1,200,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "0.8%"
                },
                {
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "08-10",
                    purchaseDate: "26/11/2022",
                    purchasePrice: "SGD 1,200,000",
                    currentEstimatedValue: "SGD 1,500,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "1.2%"
                },
                {
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "08-10",
                    purchaseDate: "26/11/2022",
                    purchasePrice: "SGD 1,200,000",
                    currentEstimatedValue: "SGD 1,500,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "1.2%"
                },
                {
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "08-10",
                    purchaseDate: "26/11/2022",
                    purchasePrice: "SGD 1,200,000",
                    currentEstimatedValue: "SGD 1,500,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "1.2%"
                },
                {
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "08-10",
                    purchaseDate: "26/11/2022",
                    purchasePrice: "SGD 1,200,000",
                    currentEstimatedValue: "SGD 1,500,000",
                    estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
                    rentalYield: "1.2%"
                },
            ]
        }
    },
}
</script>
<style lang="scss" scoped>

</style>