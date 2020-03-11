<template>
 <div id="app">
  
    
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row>
        <b-col></b-col>
        <b-col> <h1>Contacts</h1></b-col>
        <b-col align-self="end"><b-button v-b-modal.modalPopover variant="success"> <strong>+</strong> Add Contact</b-button></b-col>
      </b-row>
     <b-modal hide-footer id="modalPopover" title="Modal with Popover" ok-only>
     <b-form v-on:submit.prevent="onSubmit" @reset="onReset">

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Last Name" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="lastName"
          required
          placeholder="Enter Last Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Contact Number" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="contactNumber"
          required
          placeholder="Enter Contact Number"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="emailAddress"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
 <b-row>
   <b-col></b-col>
   <b-col></b-col>
   <b-col></b-col>
   <b-col>
     <b-button type="submit" variant="primary">Submit</b-button>
   </b-col>
   <b-col><b-button type="reset" variant="danger">Reset</b-button></b-col>
 </b-row>
    </b-form>
  </b-modal>
    </b-container>
 <br>
 <contacts/>
 <br>
</div>
</template>

<script>
import contacts from './components/Contacts'
import { ADD_CONTACTS } from './queries';

export default {
  name: 'app',
  components :{
    contacts
  },
  data(){
    return {
      name: '',
      lastName: '',
      emailAddress: '',
      contactNumber:'',
      error: null
    };
  },
  methods: {
    onSubmit(){
      const name = this.name;
      const lastName = this.lastName;
      const emailAddress = [this.emailAddress];
      const contactNumber = [this.contactNumber];
      this.$apollo.mutate({
        mutation: ADD_CONTACTS,
        variables:{
          name,
          lastName,
          emailAddress,
          contactNumber
        }, 
      }).catch(error =>{
         console.error(error);
          this.person = name;
          this.error = `There has been a problem adding ${name} :(`;
      });
      alert("Contact Added");
        location.reload();
    },
    onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.emailAddress = ''
        this.name = ''
        this.lastName = ''
        this.contactNumber = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }

  }
  

}
  //   methods: {
  //     addContact(name,lastName, emailAddress, contactNumber){
  //       this.$apollo.mutate({
  //         mutation: gql` mutation addContact($name: String!, $lastName: String!, $emailAddress: [], $contactNumber: []){
  //           addContact(name: $name, lastName: $lastName, emailAddress: $emailAddress, contactNumber: $contactNumber){
  //             id,
  //             name,
  //             lastName,
  //             emailAddress,
  //             contactNumber
  //             }
  //           }`,
  //           variables:{
  //             name:name,
  //             lastName: lastName,
  //             emailAddress: emailAddress,
  //             contactNumber: contactNumber
  //           }
  //         }
  //       )
  //       location.reload()
  //     },
  // updateContact(id,name,lastName,emailAddress,contactNumber){
  //   this.$apollo.mutate({
  //     mutation: gql`mutation updateContact($id: ID!, $name: String!, $lastName: String!, $emailAddress: [], $contactNumber: []){
  //       updateContact(id:$id, name: $name,lastName: $lastName, emailAddress: $emailAddress, contactNumber: $contactNumber)}
  //       `,
  //       variables:{
  //         id:id,
  //         name:name,
  //         lastName:lastName,
  //         emailAddress: emailAddress,
  //         contactNumber: contactNumber
  //       }
  //     }
  //   )
  //   location.reload();
  // },
  // deleteContact(id){
  //   this.$apollo.mutate({
  //     mutation: gql` mutation deleteContact($id: ID!){
  //       deleteContact(id: $id)
  //       }`,
  //       variables:{
  //         id:id
  //       }
  //     }
  //   )
  //   location.reload();
  // },
  //   },
  // }

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
