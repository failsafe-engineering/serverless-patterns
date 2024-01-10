import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, PutCommandInput, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb'

const createClient = (): DynamoDBClient => new DynamoDBClient({ region: "eu-west-2" })

const dynamoDbClient = DynamoDBDocumentClient.from(createClient())
const TABLE_NAME = 'appsync-lambda-dynamodb-sam-posts'

type Post = {
  id: string
  title: string
  author: string
  content: string
  ups: number
  downs: number
}

type SamAppSyncResolverEvent<TArgs> = {
  field: string,
  arguments: TArgs,
  source: unknown | null
}

type PostInput = {
  id: string,
  author: string,
  title: string,
  content: string
}

type PostId = {
  id: string
}

function createPost ({
  id,
  author,
  title,
  content
}: PostInput): Post {
  return {
    id,
    author,
    title,
    content,
    ups: 100,
    downs: 10,
  }
}

async function getPost (id: string): Promise<Post> {
  const params: GetCommandInput = {
    TableName: TABLE_NAME,
    Key: { id },
  }
  const command = new GetCommand(params)
  const { Item } = await dynamoDbClient.send(command)
  return Item as Post
}

async function addPost (postInput: PostInput): Promise<Post> {
  const post = createPost(postInput)
  const params: PutCommandInput = {
    TableName: TABLE_NAME,
    Item: post,
  }
  const command = new PutCommand(params)
  await dynamoDbClient.send(command)
  return post
}

exports.handler = async (event: SamAppSyncResolverEvent<PostInput>): Promise<Post> => {
  console.log('incoming event: ', JSON.stringify(event, null, 2))
  switch (event.field) {
    case "getPost":
      console.log('getPost branch')
      return await getPost(event.arguments.id)
    case "addPost":
      console.log('addPost branch')
      return await addPost(event.arguments)
    default:
      throw new Error("Unknown field, unable to resolve " + event.field);
  }
}
