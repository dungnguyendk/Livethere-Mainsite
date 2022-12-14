<template lang="html">
    <tr>
        <td>
            {{source.code}}
        </td>
        <td>
            {{source.data}}
        </td>
    </tr>
</template>

<script>
export default {
    name: "TableRecord",
    props: {
        source: {
            type: Object,
            default: () =>{}
        },
    },
}
</script>
