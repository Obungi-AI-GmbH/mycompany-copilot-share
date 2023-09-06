"use server";
import "server-only";

import { userHashedId, userSession } from "@/features/auth/helpers";
import { FindAllChats } from "@/features/chat/chat-services/chat-service";
import { SqlQuerySpec } from "@azure/cosmos";
import { nanoid } from "nanoid";
import { initDBContainer } from "../../common/cosmos";
import {
  QA_THREAD_ATTRIBUTE,
  QAThreadModel,
} from "./models";

export const CreateQAThread = async () => {
    const modelToSave: QAThreadModel = {
      name: "new qa",
      useName: (await userSession())!.name,
      userId: await userHashedId(),
      createdAt: new Date(),
      isDeleted: false,
      chatType: "simple",
      model: "gpt-3.5",
      conversationStyle: "precise",
      type: QA_THREAD_ATTRIBUTE,
    };
  
    const container = await initDBContainer();
    const response = await container.items.create<QAThreadModel>(modelToSave);
    return response.resource;
  };

  export const FindQAThreadByID = async (id: string) => {
    const container = await initDBContainer();
  
    const querySpec: SqlQuerySpec = {
      query:
        "SELECT * FROM root r WHERE r.type=@type AND r.userId=@userId AND r.id=@id AND r.isDeleted=@isDeleted",
      parameters: [
        {
          name: "@type",
          value: QA_THREAD_ATTRIBUTE,
        },
        {
          name: "@userId",
          value: await userHashedId(),
        },
        {
          name: "@id",
          value: id,
        },
        {
          name: "@isDeleted",
          value: false,
        },
      ],
    };
  
    const { resources } = await container.items
      .query<QAThreadModel>(querySpec)
      .fetchAll();
  
    return resources;
  };