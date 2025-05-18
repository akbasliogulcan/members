import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Field from "./Field";
import axios from "axios";

const Modal = ({
  isModelOpen,
  setIsModelOpen,
  setContact,
  editItem,
  setEditItem,
}) => {
  //*******Modal içerisindeki form gönderildiğinde çalışacak fonks.************
  const handleSubmit = async (e) => {
    //*****sayfa yenilenmesini engelle
    e.preventDefault();

    //*Js'in içerisinde yer alan formData yapısı sayseinde birden çok inputun değerlerini teker teker almak yerine bunu tek sferde yapabilriiz.
    const formData = new FormData(e.target);
    //*formData.entries() metodu inputlardan gelen değerleri bir dizisi şeklinde döndürür.
    //*bizde burada  inputlar içerisindeki değerler ile   yeni bir kişi verisi elde ettik.
    const newContact = Object.fromEntries(formData.entries()); // console.log(e.target[0].value);

    //!Eğer güncellenecek eleman yoksa
    if (!editItem) {
      //*Kişiekleme
      //*Elde edilen yeni kişi verisi api'ya gönder.
      const response = await axios.post(
        "http://localhost:3000/contact",
        newContact
      );

      //*APi'ya post isteği atarak eklediğimiz kullanıcıyı contact statine aktarmamız lazım eğer yapmazsak arayüzde eklenen kişiyi göremeyiz.
      //*Yeni eklenen kişiyi contact statine eklerken öncesinde bulunan kişileri ...contact ile koru üzerine yeni eklenen kişiyi ekle.
      setContact((contact) => [...contact, response.data]);
    } else {
      // * Güncelleme işlemi
      // Api'a güncelleme işlemi için istek at
      const response = await axios.put(
        `http://localhost:3000/contact/${editItem.id}`,
        newContact
      );
      // Contacts state'ini dön eğer güncellenecej elemanın id'si bir elemanlar eşleşiyorsa o zaman güncellenen değeri return et yoksa mevcut değeri return et
      setContact((contact) =>
        contact.map((contact) =>
          contact.id === editItem.id ? response.data : contact
        )
      );
    }

    //*edit itemi nulla al
    setEditItem(null);

    // //*Model'ı kapat
    setIsModelOpen(false);
  };

  return (
    isModelOpen && ( //true ise
      <div className="modal">
        {/* Modal inner */}
        <div className="modal-inner">
          {/* Head */}

          <div className="modal-head">
            <h1>{editItem ? "kişiyi güncelle" : "Yeni  kişi ekle"}</h1>
            <button onClick={() => setIsModelOpen(false)}>
              <IoCloseSharp />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim" name="name" />
            <Field value={editItem?.surname} label="Soyisim" name="surname" />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon " name="phone" />
            <Field value={editItem?.email} label="Email" name="email" />
            <Field
              value={editItem?.position}
              label="Position"
              name="position"
            />

            <div className="buttons">
              <button type="submit">Gönder</button>
              <button
                onClick={() => {
                  //modalı kapat
                  setIsModelOpen(false);
                  //edit item stateini null 'a çek
                  setEditItem(null);
                }}
              >
                Vazgeç
              </button>
              <button type="submit">
                {editItem ? "güncelle" : "kayıt et"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
