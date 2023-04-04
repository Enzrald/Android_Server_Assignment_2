const mongoose = require("mongoose");

const SanPhamSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    gia: {
        type: Number,
    },
    soluong: {
        type: Number
    },
    loaiSP: {
        type: String
    },
    khuyenmai: {
        type: Number
    }
});
const SanPhamModel = mongoose.model("sanphams", SanPhamSchema);

module.exports = SanPhamModel;