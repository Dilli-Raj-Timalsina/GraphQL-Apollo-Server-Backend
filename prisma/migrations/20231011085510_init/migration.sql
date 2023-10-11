-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "descriptions" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "OutputBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OutputBook" ADD CONSTRAINT "OutputBook_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
