<template>
  <div>
    <tr>
      <td headers="property" data-title="Property">
        <div>
          <img
            src="https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw"
            class="image"
            alt=""
          />
          <span>lloyd sixtyfive</span>
        </div>
      </td>
      <td headers="unit" data-title="Unit No."><p>10-24</p></td>
      <td headers="address" data-title="Address">
        <p class="address">65 Lloyd Road, Singapore 239114</p>
      </td>
      <td headers="relationship" data-title="Relationship Manager">
        <p>Wu Chin Whee <br />+65 96157959</p>
      </td>

      <td headers="listed" data-title="Listed Since"><p>10/2009</p></td>
      <td headers="rent" data-title="Asking Rent"><p>SGD 4.000</p></td>
      <td headers="price" data-title="Asking Price"><p>SGD 5.000.000</p></td>
    </tr>
    <tr>
      <td headers="property" data-title="Property">
        <div>
          <img
            src="https://i.picsum.photos/id/369/800/700.jpg?hmac=YYgWNBSu0rjDEqasddMyZvOZ7iBFve0SPrFD3NwOzcw"
            class="image"
            alt=""
          />
          <span>lloyd sixtyfive</span>
        </div>
      </td>
      <td headers="unit" data-title="Unit No."><p>10-24</p></td>
      <td headers="address" data-title="Address">
        <p class="address">65 Lloyd Road, Singapore 239114</p>
      </td>
      <td headers="relationship" data-title="Relationship Manager">
        <p>Wu Chin Whee <br />+65 96157959</p>
      </td>

      <td headers="listed" data-title="Listed Since"><p>10/2009</p></td>
      <td headers="rent" data-title="Asking Rent"><p>SGD 4.000</p></td>
      <td headers="price" data-title="Asking Price"><p>SGD 5.000.000</p></td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "MarketingInventoryRecord",
};
</script>

<style lang="scss" scoped>
tbody {
  tr {
    position: relative;
    vertical-align: top;
  }
  td {
    padding: 1.3rem 1.7rem 2.9rem;
    border-bottom: 1px solid #e5e5e5;
    .image {
      // padding-bottom: 64%;
      position: relative;
      width: 10rem;
      height: 6.4rem;
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
      text-decoration-line: underline;
      white-space: nowrap;
      /* 26A0F6 cyan */

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
    .address {
      width: 20.6rem;
    }
  }
}
</style>
