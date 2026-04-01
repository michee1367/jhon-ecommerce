export const ADMIN_ROLE="ADMIN"
export const ROLE_AGENT="AGENT"
export const ROLE_BAILLEUR="BAILLEUR"
export const ROLE_STAFF="STAFF"
export const ROLE_VALIDATOR="VALIDATOR"

import * as tables from "@/tools/table";

export function is_admin(user) {
    console.log("user###################")
    console.log(user)
    return user.user.roles.find(role => role == ADMIN_ROLE)
}

export function is_agent(user) {
    return user.user.roles.find(role => role == ROLE_AGENT)    
}
export function is_bailleur(user) {
    return user.user.roles.find(role => role == ROLE_BAILLEUR)        
}
export function is_staff(user) {
    return user.user.roles.find(role => role == ROLE_STAFF)        
}
export function is_validator(user) {
    return user.user.roles.find(role => role == VALIDATOR)        
}

export function is_visitor(user) {
    return user.user.roles.find(
        role => role != ADMIN_ROLE && 
                    role != ROLE_AGENT && 
                    role != ROLE_BAILLEUR && 
                    role != ROLE_STAFF && 
                    role != ROLE_VALIDATOR 
                )  
    
}

export function can_acccess_page(user, table) {
    let cashers =  [tables.TARIF, tables.TRANSATION, tables.WORK_SHIFT]
    let controllers =  [tables.TARIF, tables.RECONCILIATION_FILE, tables.RECONCILIATION_LINE, tables.VEHICLE_PASSED]
    let admins = [tables.EQUIPMENT, tables.EVENT, tables.LANE, tables.SUPPLIER, tables.TARIF, 
        tables.TOLL_BOOTH, tables.USER, tables.VEHICLE, tables.VEHICLE_PASSED, tables.VEHICLE_CATEGORY]
        
    return user.user.roles.find(role => {
        role != ADMIN_ROLE && role != ROLE_CONTROLLEUR_FINANCIER && role != ROLE_CAISSIER;
        if(role == ADMIN_ROLE) {
            return admins.find( tableExist => tableExist == table)
        }else if(role == ROLE_CONTROLLEUR_FINANCIER) {
            return controllers.find( tableExist => tableExist == table)

        }else if(role == ROLE_CAISSIER) {
            return cashers.find( tableExist => tableExist == table)

        }else {
            return false
        }
    })


}