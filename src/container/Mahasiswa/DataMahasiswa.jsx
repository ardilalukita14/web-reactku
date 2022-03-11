import React, {Component} from "react";
import './DataMahasiswa.css';
import DataMhs from "../../component/Mahasiswa/DataMhs";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

class DataMahasiswa extends Component {
    state = {                        // komponen state dari React untuk statefull component
        listMahasiswa: [],              // variabel array yang digunakan untuk menyimpan data API
        insertMahasiswa: {               // variabel yang digunakan untuk menampung sementara data yang akan di insert
                nim: 2041720056,             // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
                id: 1,
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
        formInsertMahasiswa['id'] = timestamp;
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
            body: JSON.stringify(this.state.insertMahasiswa)      // kirimkan ke body request untuk data artikel yang akan ditambahkan (insert)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();      // reload / refresh data
            });
    }

     render() {
         return (

            <div className="dataMahasiswa">
            <div className="form pb-2 border-bottom">
                <div className="form-group row">
            
                <h3 className="textMain"><b>Tambah Data Mahasiswa</b></h3>
                <div className="logoPolinema">
                    <img src="https://1.bp.blogspot.com/-PpH7CcrJIvE/X5WGsZUp6LI/AAAAAAAADRE/VIw1_NyjUC4HUnijuO1r2WBG4tfjpJGbgCLcBGAsYHQ/s1920/Logo%2BPolinema%2B%2528Politeknik%2BNegeri%2BMalang%2529.png" alt="Logo Polinema" />
            </div>
                <div className="ui divider">
                    <div className="ui form">
                    <div className="field">
                    <label htmlFor="nim" className="col-sm-2 col-form-label">NIM</label>
                        <input type="text" className="form-control" id="nim" name="nim" placeholder="NIM" onChange={this.handleTambahMahasiswa}/>
                    </div>

                    <div className="field">
                    <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <input type="text" className="form-control" id="nama" name="nama" placeholder="Nama" onChange={this.handleTambahMahasiswa}/>
                    </div>

                    <div className="field">
                    <label htmlFor="alamat" className="col-sm-2 col-form-label">Alamat</label>
                        <input type="text" className="form-control" id="alamat" name="alamat" placeholder="Alamat" onChange={this.handleTambahMahasiswa}/>
                    </div>

                    <div className="field">
                    <label htmlFor="hp" className="col-sm-2 col-form-label">HP</label>
                        <input type="text" className="form-control" id="hp" name="hp" placeholder="Nomor HP" onChange={this.handleTambahMahasiswa}/>
                    </div>

                    <div className="field">
                    <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                        <input type="text" className="form-control" id="angkatan" name="angkatan" placeholder="Tahun Angkatan" onChange={this.handleTambahMahasiswa}/>
                    </div>
                    
                     <div className="field">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <input type="text" className="form-control" id="status" name="status" placeholder="Status" onChange={this.handleTambahMahasiswa}/>
                    </div>  

                    {/* <div className="field">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                    <div className="radio-inline">
                    <label htmlFor="status" className="col-sm-5 col-form-label">
                        <input type="radio"  id="status" name="status" onChange={this.handleTambahMahasiswa}/>Aktif</label>
                    </div>
                    <div className="radio-inline">
                    <label htmlFor="status" className="col-sm-5 col-form-label">
                        <input type="radio"  id="status" name="status" onChange={this.handleTambahMahasiswa}/>Lulus</label>
                    </div>
                    <div className="radio-inline">
                    <label htmlFor="status" className="col-sm-5 col-form-label">
                        <input type="radio"   id="status" name="status" onChange={this.handleTambahMahasiswa}/>Cuti</label>
                        </div>
                     </div> 
                     <br></br> */}
                    
                   <div className="field">
                    <button type="submit" className="btn btn-warning" onClick={this.handleTombolSimpan}>Submit</button>        
           
</div>
</div>
          
          
                     <br></br>
                     <br></br>
                     <br></br>
                     <br></br>
                     <br></br>
                <div className="container">
            <div className="py-4">
              <h1>DAFTAR MAHASISWA POLINEMA</h1>
              </div>
                </div>
                <br></br>
                <br></br>
              <table className="table border shadow">
        <thead className="thead-dark">
        <tr>
                
                <th scope="col">NIM</th>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th scope="col">HP</th>
                <th scope="col">Angkatan</th>
                <th scope="col">Status</th>
                <th>Action</th>
              </tr>
                {
                     this.state.listMahasiswa.map(mahasiswa => {    // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <DataMhs key={mahasiswa.id} nim ={mahasiswa.nim} nama={mahasiswa.nama} alamat={mahasiswa.alamat} hp={mahasiswa.hp} angkatan={mahasiswa.angkatan} status={mahasiswa.status} idMahasiswa={mahasiswa.id} hapusDataMahasiswa={this.handleHapusMahasiswa}/>     // mappingkan data json dari API sesuai dengan kategorinya
                     })
                 }
               </thead>
               </table>
              
               </div>
               </div>
               </div>
               </div>
  );
};
}
export default DataMahasiswa;