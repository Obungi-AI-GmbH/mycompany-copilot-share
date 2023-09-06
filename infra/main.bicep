@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string
@description('Client Id')
param clientId string = ''
@description('Client Secret')
param clientSecret string = ''
@description('Tenant Id')
param tenantId string = ''

var resourceToken = toLower(uniqueString(subscription().id, name, resourceGroup().location))

module resources 'resources.bicep' = {
  name: 'resources-${resourceToken}'
  params: {
    name: name
    clientId: clientId
    clientSecret: clientSecret
    tenantId: tenantId
    resourceToken: resourceToken
  }
}
