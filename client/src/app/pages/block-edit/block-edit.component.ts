// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { BlockService } from '../../services/block.service';
import { BlockTypeService } from '../../services/block-type.service';
import { ItemTypeService } from '../../services/item-type.service';
// Import Models
import { Block } from '../../domain/rapi-dev-kit_db/block';
import { BlockType } from '../../domain/rapi-dev-kit_db/block-type';
import { Role } from '../../domain/rapi-dev-kit_db/role';

// START - USED SERVICES
/**
* BlockService.create
*	@description CRUD ACTION create
*
* BlockService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* BlockTypeService.list
*	@description CRUD ACTION list
*
* ItemTypeService.list
*	@description CRUD ACTION list
*
* BlockService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Block
 */
@Component({
    selector: 'app-block-edit',
    templateUrl: 'block-edit.component.html',
    styleUrls: ['block-edit.component.css']
})
export class BlockEditComponent implements OnInit {
    item: Block;
    listBlockType: BlockType[];
    listPrivileges: Role[];
    model: Block;
    formValid: Boolean;

    constructor(
    private blockService: BlockService,
    private blocktypeService: BlockTypeService,
    private itemtypeService: ItemTypeService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Block();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.blockService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.blocktypeService.list().subscribe(list => this.listBlockType = list);
            this.roleService.list().subscribe(list => this.listPrivileges = list);
        });
    }


    /**
     * Save Block
     *
     * @param {boolean} formValid Form validity check
     * @param Block item Block to save
     */
    save(formValid: boolean, item: Block): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.blockService.update(item).subscribe(data => this.goBack());
            } else {
                this.blockService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



