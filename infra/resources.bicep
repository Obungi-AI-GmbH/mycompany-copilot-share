param name string
param clientId string
@secure()
param clientSecret string
param tenantId string
param resourceToken string

var location = resourceGroup().location

resource openAiAccount 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: '${name}-openai-${resourceToken}'
  location: location
  kind: 'OpenAI'
  properties:{
    customSubDomainName: '${name}-openai-${resourceToken}'
  }
  sku: {
    name: 'S0'
  }
}

resource blobStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${name}blob${resourceToken}'
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2019-06-01' = {
  name: 'default'
  parent: blobStorage
}

resource storageContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'mcc'
  properties: {
    publicAccess: 'None'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: '${name}-app-${resourceToken}'
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'P0v3'
    tier: 'Premium0V3'
    size: 'P0v3'
    family: 'Pv3'
    capacity: 1
  }
  kind: 'linux'
}

resource formRecognizer 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: '${name}-formrecognizer-${resourceToken}'
  location: location
  kind: 'FormRecognizer'
  sku: {
    name: 'S0'
  }
}

resource azureSearch 'Microsoft.Search/searchServices@2022-09-01' = {
  name: '${name}-search-${resourceToken}'
  location: location
  sku: {
    name: 'basic'
  }
}

resource webApp 'Microsoft.Web/sites@2020-06-01' = {
  name: '${name}-app-${resourceToken}'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|crobuaidev.azurecr.io/mycompanycopilot:latest'
      appSettings: [
        {
          name: 'AZURE_AD_CLIENT_ID'
          value: clientId
        }
        {
          name: 'AZURE_AD_CLIENT_SECRET'
          value: clientSecret
        }
        {
          name: 'AZURE_AD_TENANT_ID'
          value: tenantId
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: ''
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: ''
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: ''
        }
        {
          name: 'AZURE_COSMOSDB_URI'
          value: cosmosDbAccount.properties.documentEndpoint
        }
        {
          name: 'AZURE_COSMOSDB_KEY'
          value: cosmosDbAccount.listKeys().primaryMasterKey
        }
        {
          name: 'AZURE_OPENAI_API_KEY'
          value: openAiAccount.listKeys().key1
        }
        {
          name: 'AZURE_OPENAI_API_INSTANCE_NAME'
          value: openAiAccount.name
        }
        {
          name: 'AZURE_OPENAI_API_DEPLOYMENT_NAME'
          value: 'gpt35t'
        }
        {
          name: 'AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME'
          value: 'embedding'
        }
        {
          name: 'AZURE_OPENAI_API_VERSION'
          value: '2023-03-15-preview'
        }
        {
          name: 'AZURE_SEARCH_API_KEY'
          value: azureSearch.listAdminKeys().primaryKey
        }
        {
          name: 'AZURE_SEARCH_NAME'
          value: azureSearch.name
        }
        {
          name: 'AZURE_SEARCH_INDEX_NAME'
          value: 'azure-chatgpt'
        }
        {
          name: 'AZURE_SEARCH_API_VERSION'
          value: '2023-07-01-Preview'
        }
        {
          name: 'AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT'
          value: formRecognizer.properties.endpoint
        }
        {
          name: 'AZURE_DOCUMENT_INTELLIGENCE_KEY'
          value: formRecognizer.listKeys().key1
        }
        {
          name: 'WEBSITES_PORT'
          value: '3000'
        }
        {
          name: 'NEXTAUTH_SECRET'
          value: '${name}app${resourceToken}'
        }
        {
          name: 'NEXTAUTH_URL'
          value: 'https://${name}-app-${resourceToken}.azurewebsites.net'
        }
        {
          name: 'AZURE_STORAGE_ACCOUNT_NAME'
          value: blobStorage.name
        }
        {
          name: 'AZURE_STORAGE_ACCOUNT_KEY'
          value: blobStorage.listKeys().keys[0].value
        }
      ]
    }
  }
}

resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: '${name}-cosmos-${resourceToken}'
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
      }
    ]
  }
}

resource cosmosDb 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  parent: cosmosDbAccount
  name: 'chat'
  properties: {
    resource: {
      id: 'chat'
    }
  }
}

resource chatContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: cosmosDb
  name: 'history'
  properties: {
    resource: {
      id: 'history'
      partitionKey: {
        paths: [
          '/userId'
        ]
      }
    }
  }
}
