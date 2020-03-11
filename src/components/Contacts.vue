<template>
    <ApolloQuery :query="query">
        <template slot-scope="{ result: { loading, error, data } }">
            <span v-if="loading">Loading...</span>
            <span v-else-if="error">An Error Occured</span>

            <section v-if="data">

<div>
  <b-col lg="4">
  <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
</b-col><br>
  <b-table  
  small 
  striped 
  hover 
  :fields="fields" 
  :filter="filter"
  v-bind:items="data.contacts | filter"
>
    <template v-slot:cell(contactNumber)="data">
        {{ data.value[0]}}
      </template>
      <template v-slot:cell(emailAddress)="data">
        {{ data.value[0]}}
      </template>
      <template v-slot:cell(id)="data">
        <b-button class="btn-primary btn-danger" @click="deleteID(data.value)" >Delete</b-button>
      </template>
      <template v-slot:cell(select)="row">
        <b-button class="btn-primary btn-success" @click="select(row.item)" >Select</b-button>
      </template>
  </b-table>
</div>
<b-modal
  hide-footer id="modalContact" title="Contact">
  <b-form v-on:submit.prevent="onSubmit">
    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="contact.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Last Name" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="contact.lastName"
          required
          placeholder="Enter Last Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Contacts:" label-for="input-4">
        <b-list-group v-for="(contact,index) in contact.contactNumber" v-bind:key="contact">
  <b-list-group-item>
    <b-row><b-col>{{contact}}</b-col><b-col></b-col><b-col></b-col><b-col><button class="btn btn-sm btn-danger" @click="deleteNumber(index)">Delete</button></b-col></b-row>
    </b-list-group-item>
</b-list-group>
<b-input-group size="sm">
            <b-form-input
              v-model="newNumber"
              placeholder="Add new Number"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="btn-primary" @click="addNumber">Add</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-form-group>

<b-form-group id="input-group-5" label="Email Addresses:" label-for="input-5">
        <b-list-group v-for="contact in contact.emailAddress" v-bind:key="contact">
  <b-list-group-item>
    <b-row><b-col>{{contact}}</b-col><b-col></b-col><b-col></b-col><b-col><button class="btn btn-sm btn-danger">Delete</button></b-col></b-row>
    </b-list-group-item>
</b-list-group>
<b-input-group size="sm">
            <b-form-input
              v-model="newEmail"
              placeholder="Add new Emails"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="btn-primary" @click="addEmail">Add</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-form-group>
    <b-row>
   <b-col></b-col>
   <b-col></b-col>
   <b-col></b-col>
   <b-col>
     <b-button type="submit" variant="primary">Update</b-button>
   </b-col>
   
 </b-row>
  </b-form>
</b-modal>
            </section>
        </template>
    </ApolloQuery>
</template>
<script>

import { GET_CONTACTS, DELETE_CONTACT, UPDATE_CONTACT } from '../queries'

export default {
    name: 'contacts',
  data () {
    return {
      fields: [{key: 'name',  sort:'ascending'}, 'lastName', 'contactNumber', 'emailAddress',{key: 'id', label:"Delete"}, 'Select'],
      query : GET_CONTACTS,
      filter: null,
      contact: {
        id: '',
        name: '',
        lastName: '',
        emailAddress: [],
        contactNumber: []
      },
      newNumber: '',
      newEmail: ''
    };
  },
  methods: {
      deleteID(index){
        console.log(index);
        this.$apollo.mutate({
          mutation: DELETE_CONTACT,
          variables:{
            id: index
          },
        }
        )
        location.reload();

      },
      deleteNumber(index){
        this.contact.contactNumber.splice(index,1);
      },
      onSubmit(){
        console.log("it Works")
        const id= this.contact.id;
            const name =  this.contact.name;
            const lastName= this.contact.lastName;
            const emailAddress= this.contact.emailAddress;
            const contactNumber= this.contact.contactNumber;
        this.$apollo.mutate({
          mutation: UPDATE_CONTACT,
          variables:{
            id,
            name,
            lastName,
            emailAddress,
            contactNumber
          },
        }
        )
        alert("Contact Updated");
        location.reload();
      },
      addNumber(){
        this.contact.contactNumber.push(this.newNumber);
      },
      addEmail(){
        this.contact.emailAddress.push(this.newEmail);
      },
      select(row){
        console.log(row);
        this.contact.id = row.id;
        this.contact.name = row.name;
        this.contact.lastName = row.lastName;
        this.contact.contactNumber = row.contactNumber;
        this.contact.emailAddress = row.emailAddress;
      this.$root.$emit('bv::show::modal', 'modalContact')
      }
      
    },
}
</script>