import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import axios from "axios";
import Card from "./components/Card";
import Modal from "./components/Modal";

const App = () => {
  //*2)Verileri bileşen içerisinde yönetmek için bir yapı oluştur
  const [contact, setContact] = useState([]);

  //*Güncellenecek eleman için State
  const [editItem, setEditItem] = useState(null);

  //*Modalın açılıp kapanmasını sağlayacak state
  const [isModalOpen, setIsModelOpen] = useState(false);

  //***1.Api'dan kullanıcı verileri al ve arayüzde renderla***
  //*1)Api'dan verileri al .Normalde fetch ile yapıyorduk ama axiousu tercih etmemizin nedeni tekrar json ile js 'e çevirlmesini istemememiz
  // useEffect(() => {
  //   fetch("http://localhost:3000/contact")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/contact")
      .then((res) => setContact(res.data));
  }, []);

  //*3)Verileri arayüzde renderla
  console.log(contact);

  //!1***************Form gönderdildğinde çalışacak fonksiyon**************************
  const handleSubmit = (e) => {
    //sayfa yenilenmesini engelle
    e.preventDefault();

    //form içerisinde aranacak kelimenin elde edilmesi
    const query = e.target[1].value;
    //burada inputun value'sini alıyoruz ve bunu backende göndermemiz gerekiyor bunu da axios ile yapıyoruz.

    //Api'ye geçilecek parametrenin hazırlanması
    const params = {
      q: query,
    };

    //Form içerisinde  elde edilen değer ile birlikte api'ye istek at.
    axios
      .get("http://localhost:3000/contact", { params })
      .then((res) => setContact(res.data));
  };
  //********************************************************************* */

  //!1**********************Silme işlemini yapan fonksiyon****************************

  const handleDelete = (id) => {
    // alert(`${id} li kullanıcı silindi`);

    //kullanıcıdan silme işlemi içi onay al
    const response = confirm("Kişiyi silmek istediğinizden emin misiniz?");
    alert(response);
    //eğer kullanıcı silme işlemini onaylarsa bu kullanıcıyı silmek için apiye istek at
    if (response) {
      //apiye silme isteği at
      axios.delete(`http://localhost:3000/contact/${id}`).then(() => {
        //!then yani api'ye atılan adres doğruysa kişiyi sil diğer türlü sadece arayüzden silinir ama backendde durur.

        //silinen kişiyi contact statin'den kaldır
        const updatedContact = contact.filter((contact) => contact.id != id);
        //güncel kişileri contact statine aktar
        setContact(updatedContact);
      });
    }
  };

  //!Güncelleme işlemi yapan fonskiyon
  const handleUpdate = (item) => {
    //modelı aç
    setIsModelOpen(true);

    setEditItem(item);
  };

  return (
    <div className="App">
      {/* header  */}
      <header>
        {/* logo */}
        <h1>Rehber</h1>

        <div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="search" placeholder="kişi aratınız" />
          </form>
          {/* Buttons */}
          <button className="ns">
            <CiMenuBurger />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModelOpen(true)} className="add">
            <IoPersonSharp className="icon" />
            <span>Yeni kişi</span>
          </button>
        </div>
      </header>
      <main>
        {contact.map((item) => (
          //*isimler renderlanıyor  React'te JSX içinde JavaScript kodu yazmak için süslü parantez {} kullanılır.
          <Card
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            key={item.id}
            item={item}
          />
        ))}
      </main>

      {/* Modal */}
      <Modal
        isModelOpen={isModalOpen}
        setIsModelOpen={setIsModelOpen}
        setContact={setContact}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
};

export default App;

//*Düzenle butonuna basıldığında
//1)Güncelleme işlemi yapan fonskiyon  .handleUpdate fonks.yarattık ve düzenle butonuna tıkladığmızda açılmasını istiyoruz
// bu da card.jsx in içinde burada <card/> handleUpdate={handleUpdate} olarak props geçiyoruz.
//card.jsx de düzenle butonuna handleUpdate fonsk.onClick olarak ekliyoruz.

//2)Modalı aç bunuda handleUpdate fonk. içine setIsModelOpen(true) olarak yazarız.
// 3) Mevcut modalı 2 farklı şekilde kullanmamız lazım güncelleme ya da ekleme
//*Güncellenecek eleman için State
// const [editItem, setEditItem] = useState(null); oluştururuz.
// setEditItem'ı handleUpdate fonsk.eklememiz lazım .setEditItem(item olarak yazmamız lazım çünkü elemanı item la seçiyoruz.)
//editItem={editItem},setEditItem={setEditItem}  modal'a prop oalrak geç

//4)modala gideriz ve apiye istek atılan yerde karar vermek gerekiyor eleman güncellenecek mi yoksa yeni bir kişi mi eklenecek
// if else kullanırız
//güncelleme kısmında yapılacaklar  (.put ile yazdık)
//güncelleme yapacağımız kullanıcın id si editItem dan geliyor. güncellenecek veride modaldaki newContact
//sonrasında güncelleme işlemi başarılı ise arayüzüde güncelle .then deriz ve bunu da setcontact yapar.
//  contact.map((contact) =>
// contact.id === editItem.id ? response.data : contact; bunu yazarız contact değerleri dön id si değiştirmek istediğin id ya eşitse yani
//güncelleme olacak anlamına gelir değilse datayı contacta aktar yani yeni kişi ekle

// 5)başlığın artık güncelle olması lazım bunuda edititem ile yapıyoruz.bunun için modaldaki Yeni kişi ekle kısmına gideriz
//eğer edititem varsa kişiyi güncelle yoksa yeni kişi ekle
//sonrasında  //*edit itemi nulla al setEditItem(null); deriz bunun nedeni kişi ekle ya da güncelle seçeneklerinin çıkması için
//sonrasında value={?editItem.name} ekleriz fielda 'da props olarak karşılarız. ? anlamı edititem var mı ?
//field da    <input defaultValue={value} yazarız defaultın anlamı silinebilir olması.
