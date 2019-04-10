import { Component, OnInit } from '@angular/core';
import { Client } from '../../../classes/client';
import { ClientService } from '../../services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {

  clients: Client[];
  finished = false;
  id = this.route.snapshot.paramMap.get('id');

  selectedClient: Client;
  newName: string;
  newDescription: string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients.data;
      this.finished = true;
    });
  }

  openWindow(content, selectedClient: Client) {
    this.modalService.open(content, {windowClass : 'dark-modal'});
    this.selectedClient = selectedClient;
    this.newName = '';
    this.newDescription = '';
  }


  removeClient() {
    this.clientService.removeClient(this.selectedClient._id).subscribe(
      res => {
        alert('Successfully deleted client <' + this.selectedClient.name + '>');
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      err => {
        alert('Failed to delete the client.');
      }
    );
  }

  editClient() {
    let selectedId = null;
    if (this.selectedClient !== null) {
      selectedId = this.selectedClient._id;
    } else {
      selectedId = undefined;
    }
    this.clientService.editClient(selectedId, this.newName, this.newDescription).subscribe(
      res => {
        alert('Client information updated successfully!');
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      err => {
        alert('Operation failed!');
      }
    );
  }


}
