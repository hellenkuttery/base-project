// Bilgi Ekleme,silme ve düzeltme işlemler olacak, bu nedenle export kullanılacak
import { useState, useEffect } from "react";
import firebase from "./firebase";
import { getDatabase,ref, set,push,onValue, remove,update} from "firebase/database";
import Tostify from "./toastify";

export const addInfo = (info) => {
    const db = getDatabase();
    const userRef = ref(db, "baglanti");
    const newUserRef = push(userRef);
    set(newUserRef, {
      username: info.username,
      phoneNumber: info.phoneNumber,
      gender: info.gender,
    } 
    )  
    
  };

  // Bilgi çağırma

  export const useFetch=()=>{    
    const [isLoading,setIsLoading]= useState();
    const [contactList,setContactList]=useState();

    
      useEffect(()=>{
        setIsLoading(true);
        
        const db = getDatabase();
        const userRef = ref(db, "baglanti");

        onValue(userRef, (snapshot) => {
          const data = snapshot.val();    
          const baglantiArray=[];          
       

        for (let id in data){
          baglantiArray.push({id,...data[id]})
        }
        setContactList(baglantiArray);
        setIsLoading(false)
      });

      },[])
  
    return {isLoading,contactList}

  }


  // Bilgi silme

  export const DeleteInfo=(id)=>{
    const db = getDatabase();
    const userRef = ref(db, "baglanti");

    remove(ref(db,"baglanti/"+id))
    Tostify("Veri Başarıyla Silindi")
  }

  export const EditInfo=(info)=>{
  
    const db = getDatabase();
    const updates = {};

    updates["baglanti/"+info.id]=info;
    return update(ref(db), updates);

  }