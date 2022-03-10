import React, {Component} from "react";
import './DataMahasiswa.css';
import DataMhs from "../../component/Mahasiswa/DataMhs";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

class DataMahasiswa extends Component {
    state = {                        // komponen state dari React untuk statefull component
        listMahasiswa: [],              // variabel array yang digunakan untuk menyimpan data API
        insertMahasiswa: {               // variabel yang digunakan untuk menampung sementara data yang akan di insert
                nim: 2041720056,             // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
                nama: "",
                alamat: "",
                hp: "",
                angkatan: 2020,
                status:""
        }

    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3002/mahasiswa')  // alamat URL API yang ingin kita ambil datanya
            .then(response => response.json())  // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {    // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state 
                this.setState({
                    listMahasiswa: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {           // komponen untuk mengecek ketika component telah di-mount-ing, maka panggil API 
        this.ambilDataDariServerAPI()

    }

    handleHapusMahasiswa = (data) => {
        fetch(`http://localhost:3002/mahasiswa/${data}`, {method: 'DELETE'})  // alamat URL API yang ingin kita HAPUS datanya
            .then(res => {      // ketika proses hapus berhasil, maka ambil data dari server API lokal 
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahMahasiswa = (event) => {      // fungsi untuk meng-handle form tambah data artikel
        let formInsertMahasiswa = {...this.state.insertMahasiswa};      // clonning data state insertArtikel ke dalam variabel formInsertArtikel
        let timestamp = new Date().getTime();                        // digunakan untuk menyimpan waktu (sebagai ID artikel)
        formInsertMahasiswa['nim'] = timestamp;
        formInsertMahasiswa[event.target.name] = event.target.value;      // menyimpan data onchange ke formInsertArtikel sesuai dengan target yang diisi
        this.setState({
            insertMahasiswa: formInsertMahasiswa
        });
    }

    handleTombolSimpan = () => {        // fungsi untuk meng-handle tombol simpan
        fetch('http://localhost:3002/mahasiswa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            
            },
            body: JSON.stringify(this.state.insertArtikel)      // kirimkan ke body request untuk data artikel yang akan ditambahkan (insert)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();      // reload / refresh data
            });
    }

     render() {
         return (
            <div className="container">
            <div className="py-4">
              <h1>DAFTAR MAHASISWA POLINEMA</h1>
              <table class="table border shadow">
            <thead class="thead-dark">
            <tr>
                    <th scope="col">No</th>
                    <th scope="col">NIM</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">HP</th>
                    <th scope="col">Angkatan</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {
                     this.state.listMahasiswa.map((mahasiswa, index) => {    // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <DataMhs key={mahasiswa.nim} nama={mahasiswa.nama} alamat={mahasiswa.alamat} hp={mahasiswa.hp} angkatan={mahasiswa.angkatan} status={mahasiswa.status} NimMahasiswa={mahasiswa.nim} hapusDataMahasiswa={this.handleHapusMahasiswa}/>     // mappingkan data json dari API sesuai dengan kategorinya
                     })
                 }
               </table>
      </div>
    </div>
  );
};
}
export default DataMahasiswa;