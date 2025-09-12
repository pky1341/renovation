'use client'
import { Admin, Resource } from 'react-admin'
import { dataProvider } from '../../src/lib/dataProvider'
import { ContactList, ContactEdit, ContactCreate } from '../../src/components/admin/contacts'
import { Dashboard } from '../../src/components/admin/dashboard'

export default function AdminPanel() {
  return (
    <Admin 
      dataProvider={dataProvider} 
      dashboard={Dashboard}
      title="OfficeTransform Admin"
    >
      <Resource 
        name="contacts" 
        list={ContactList} 
        edit={ContactEdit} 
        create={ContactCreate}
        options={{ label: 'Contacts' }}
      />
    </Admin>
  )
}