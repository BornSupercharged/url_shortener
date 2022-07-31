<template>
  <div class="container mx-auto">
    <div class="max-w-full border border-gray-300 rounded-sm bg-white">
      <div class="p-6">
        <h5 class="text-lg font-medium">URL Shortener</h5>
        <form
          @submit.prevent="submitUrl"
        >
          <AlertError :form="url" />

          <div class="mt-4">
            <div class="form-group d-flex">
              <input
                type="text"
                id="link"
                placeholder="Enter URL"
                v-model="link"
                class="
                  w-50
                  px-4
                  py-2
                  mt-2
                  border
                  rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-600
                "
              />
              <input
                type="text"
                id="user_shortcode"
                placeholder="Enter Shortcode"
                v-model="user_shortcode"
                class="
                  w-35
                  ml-2
                  px-4
                  py-2
                  mt-2
                  border
                  rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-600
                "
              />
              <div class="flex items-baseline justify-between mt-2 ml-2">
                <Button :form="url" class="btn-primary p-10"> Generate Shortcode </Button>
              </div>
            </div>
            <HasError :form="url" field="link" />
          </div>
        </form>

        <h5 class="text-lg font-medium mt-10 mb-4">Listed of URL Shortcodes</h5>
        <div id="flex">
          <table class="table table-hover table-bordered" id="example">
              <thead>
                  <tr>
                      <th >#</th>
                      <th >URL</th>
                      <th >Shortcode</th>
                      <th >Clicks</th>
                      <th >Last Access At</th>
                      <th >Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in urlLists" :key="item.id">
                      <td>{{urlLists.indexOf(item)+1}}</td>
                      <th>{{item.link}}</th>
                      <td><a :href="this.base_url+'/url/'+ item.shortcode" target="_blank">{{item.shortcode}}</a></td>
                      <td>{{item.clicks}}</td>
                      <td>{{this.formatTime(item.last_access_timestamp)}}</td>
                      <td>
                        <a @click="deleteItem(item.id)" href="javascript:void(0);" class="btn btn-danger btn-sm">Delete</a>
                        <a href="javascript:void(0);" @click="copyItem(this.base_url+'/url/'+ item.shortcode)" class="ml-1 btn btn-info btn-sm">Copy Link</a>
                        <a :href="this.base_url+'/url/'+ item.shortcode+'/stats'" target="_blank" class="ml-1 btn btn-primary btn-sm">Statistics</a>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "jszip-utils/dist/jszip-utils.js";
import "jszip/dist/jszip.js";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake.min.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-bs5/js/dataTables.bootstrap5.js";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.css";
import "datatables.net-buttons-bs5/js/buttons.bootstrap5.js";
import moment from 'moment';
import $ from 'jquery'; 
import axios from 'axios';
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import Form from "vform";
import { computed, onMounted } from "@vue/runtime-core";
import { Button, HasError, AlertError } from "vform/src/components/tailwind";

const store = useStore();

const url = reactive(
  new Form({
    link: null,
  })
);
export default {
  mounted(){
    var parent=this;
    axios
    .get("links")
    .then((res)=>
    {
      this.urlLists = res.data;
      setTimeout(function(){
        parent.table();
      },
        1000
        );
    });

  },
  data: function() {
        return {
            urlLists:[],
            link:null,
            user_shortcode:null,
            base_url:window.location.origin,
        }
    },
    methods: {
    table(){
      $('#example').DataTable(
          {
                pageLength: 50,
                processing: true,
                dom: 'Bfrtip',
                buttons: [
                  {
                      extend: 'csvHtml5',
                      exportOptions: {
                          columns: [ 0, 1, 2, 3, 4 ]
                      }
                  },
                  {
                      extend: 'pdfHtml5',
                      exportOptions: {
                          columns: [ 0, 1, 2, 3, 4 ]
                      }
                  },
              ]
          }
      );
    },
    formatTime (time) {
      if(!time) {
        return "N/A";
      }
      return time;
      let previousTime = moment(time,'YYYY-MM-DD HH:mm:ss').format('x');
      let timeDifference = moment(previousTime,'x').fromNow();
      return timeDifference;
    },
    submitUrl(ev) {
      try {
        if(this.link=="" || this.link==undefined) {
          alert('Url is required');
          return;
        }
        if(this.user_shortcode!="" || this.user_shortcode!=undefined || this.user_shortcode != null) {
          if(this.user_shortcode && this.user_shortcode.length<4) {
            alert('Shortcode should be atleast 4 characters long.');
            return;
          }
        }
        axios.post('/links',{link: this.link,user_shortcode:this.user_shortcode}).then((response)=>{
          if(response.data.error) {
            alert(response.data.error);
            return;
          }
          this.link="";
          this.user_shortcode="";
          axios
          .get("links")
          .then((res)=>
          {
            this.urlLists = res.data;
          });
          $('#example').DataTable().destroy();
          var parent=this;
          setTimeout(function(){
            parent.table();
          },
            1000
          );
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem(id) {
      try {
        if (!confirm("Do you want to delete")){
            return false;
        }
        axios.post('/links/delete',{id: id}).then((response)=>{
          axios
          .get("links")
          .then((res)=>
          {
            this.urlLists = res.data;
          });
          $('#example').DataTable().destroy();
          var parent=this;
          setTimeout(function(){
            parent.table();
          },
            1000
          );
        });
      } catch (error) {
        console.log(error);
      }
    },
    copyItem(id) {
      try {
        navigator.clipboard.writeText(id);
        alert("Copied to the clipboard.");
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style scoped></style>
