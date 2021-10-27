CREATE TABLE [dbo].[Profile] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Identity_ID] NVARCHAR (450) NOT NULL,
    [Avatar]      NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

