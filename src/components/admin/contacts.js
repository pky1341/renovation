import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SelectField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Create,
  Filter,
  SearchInput,
  BulkDeleteButton,
  BulkExportButton,
  TopToolbar,
  ExportButton,
  CreateButton
} from 'react-admin'

const ContactFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <SelectInput 
      source="status" 
      choices={[
        { id: 'new', name: 'New' },
        { id: 'contacted', name: 'Contacted' },
        { id: 'in_progress', name: 'In Progress' },
        { id: 'completed', name: 'Completed' }
      ]} 
    />
    <SelectInput 
      source="spaceType" 
      choices={[
        { id: 'office', name: 'Office' },
        { id: 'retail', name: 'Retail' },
        { id: 'restaurant', name: 'Restaurant' },
        { id: 'medical', name: 'Medical' }
      ]} 
    />
  </Filter>
)

const ContactListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
)

const ContactBulkActions = () => (
  <>
    <BulkDeleteButton />
    <BulkExportButton />
  </>
)

export const ContactList = () => (
  <List 
    filters={<ContactFilter />}
    actions={<ContactListActions />}
    bulkActionButtons={<ContactBulkActions />}
    perPage={25}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <SelectField 
        source="spaceType" 
        choices={[
          { id: 'office', name: 'Office' },
          { id: 'retail', name: 'Retail' },
          { id: 'restaurant', name: 'Restaurant' },
          { id: 'medical', name: 'Medical' }
        ]} 
      />
      <SelectField 
        source="status" 
        choices={[
          { id: 'new', name: 'New' },
          { id: 'contacted', name: 'Contacted' },
          { id: 'in_progress', name: 'In Progress' },
          { id: 'completed', name: 'Completed' }
        ]} 
      />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export const ContactEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="email" type="email" required />
      <TextInput source="phone" />
      <SelectInput 
        source="spaceType" 
        choices={[
          { id: 'office', name: 'Office' },
          { id: 'retail', name: 'Retail' },
          { id: 'restaurant', name: 'Restaurant' },
          { id: 'medical', name: 'Medical' }
        ]} 
        required
      />
      <SelectInput 
        source="status" 
        choices={[
          { id: 'new', name: 'New' },
          { id: 'contacted', name: 'Contacted' },
          { id: 'in_progress', name: 'In Progress' },
          { id: 'completed', name: 'Completed' }
        ]} 
        required
      />
      <TextInput source="message" multiline rows={4} />
    </SimpleForm>
  </Edit>
)

export const ContactCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="email" type="email" required />
      <TextInput source="phone" />
      <SelectInput 
        source="spaceType" 
        choices={[
          { id: 'office', name: 'Office' },
          { id: 'retail', name: 'Retail' },
          { id: 'restaurant', name: 'Restaurant' },
          { id: 'medical', name: 'Medical' }
        ]} 
        required
        defaultValue="office"
      />
      <SelectInput 
        source="status" 
        choices={[
          { id: 'new', name: 'New' },
          { id: 'contacted', name: 'Contacted' },
          { id: 'in_progress', name: 'In Progress' },
          { id: 'completed', name: 'Completed' }
        ]} 
        required
        defaultValue="new"
      />
      <TextInput source="message" multiline rows={4} />
    </SimpleForm>
  </Create>
)