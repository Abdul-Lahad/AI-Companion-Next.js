"use client"

import { Category, Companion } from "@/lib/generated/prisma";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

interface CompanionFormProps{
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required"
    }),
    description: z.string().min(1,{
        message: "Description is required"
    }),
    instruction: z.string().min(200,{
        message: "Instruction require at least 200 characters"
    }),
    seed: z.string().min(200,{
        message: "Seed require at least 200 characters"
    }),
    src: z.string().min(1,{
        message: "image is required"
    }),
    CategoryId: z.number().min(1,{
        message: "CategoryId is required"
    }),
})

const CompanionForm = ({initialData, categories}: CompanionFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
          resolver : zodResolver(formSchema),
          defaultValues: initialData || {
              name: "",
              description: "",
              instruction: "",
              seed: "",
              src: "",
              CategoryId: undefined,
          }
      })

      const isLoading = form.formState.isSubmitting;

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
          // Handle form submission

          console.log(values);
      }

    return ( 
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                <div className="space-y-2 w-full">
                    <div>
                        <h3 className="text-lg font-medium">General Information</h3>
                        <p className="text-sm text-muted-foreground">
                            General Information about your companion
                        </p>
                    </div>
                    <Separator className="bg-primary/10"/>
                    

                </div>  

                <FormField
                name="src"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <ImageUpload
                               value={field.value}
                               onChange={field.onChange}
                               disabled={isLoading}
                           />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Aren Yegar"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This how your AI Companion will be named.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="LeadRole of Attack on Titan"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Short Description of your AI Companion.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="CategoryId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                 disabled={isLoading}
                                 onValueChange={(val) => field.onChange(Number(val))}
                                 value={field.value ? field.value.toString() : ""}
                                 defaultValue={field.value ? field.value.toString() : ""}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue
                                             defaultValue={field.value}
                                             placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            categories.map((category) => (
                                                <SelectItem 
                                                    key={category.id} 
                                                    value={category.id.toString()}
                                                    >
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>

                                </Select>
                                <FormDescription>
                                    Select the category for your AI companion.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="space-y-2 w-full">
                    <div>
                    <h3 className="text-lg font-medium">Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                        Detailed instruction for AI behaviour can be configured here.
                    </p>
                    </div>
                    <Separator className="bg-primary/10" />

                </div>
                <FormField
                        name="instruction"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instruction</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={isLoading}
                                        rows={7}
                                        placeholder={PREAMBLE}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your companion&apos;s background, goals, and how it should respond to user inputs. 
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Example conversation</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={isLoading}
                                        rows={7}
                                        placeholder={SEED_CHAT}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Provide an example conversation to help guide the AI's responses.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size='lg' disabled={isLoading}>
                            {initialData ? "Update Companion" : "Create Companion"}
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>

                    </div>
            </form>
           </Form>

        </div>
     );
}
 
export default CompanionForm;