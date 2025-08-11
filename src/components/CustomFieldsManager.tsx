import { useState } from "react";
import { Plus, X, Eye, EyeOff, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomField } from "@/types/kanban";

interface CustomFieldsManagerProps {
  customFields: CustomField[];
  onUpdateFields: (fields: CustomField[]) => void;
}

export function CustomFieldsManager({ customFields, onUpdateFields }: CustomFieldsManagerProps) {
  const [localFields, setLocalFields] = useState<CustomField[]>(customFields);
  const [isCreating, setIsCreating] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select'>('text');
  const [newFieldOptions, setNewFieldOptions] = useState<string>('');

  const handleCreateField = () => {
    if (!newFieldName.trim()) return;

    const newField: CustomField = {
      id: `field-${Date.now()}`,
      name: newFieldName.trim(),
      type: newFieldType,
      value: newFieldType === 'number' ? 0 : '',
      options: newFieldType === 'select' && newFieldOptions.trim() ? 
        newFieldOptions.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0) : undefined,
      visible: false
    };

    const updatedFields = [...localFields, newField];
    setLocalFields(updatedFields);
    onUpdateFields(updatedFields);

    // Reset form
    setNewFieldName('');
    setNewFieldType('text');
    setNewFieldOptions('');
    setIsCreating(false);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<CustomField>) => {
    const updatedFields = localFields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    setLocalFields(updatedFields);
    onUpdateFields(updatedFields);
  };

  const handleDeleteField = (fieldId: string) => {
    const updatedFields = localFields.filter(field => field.id !== fieldId);
    setLocalFields(updatedFields);
    onUpdateFields(updatedFields);
  };

  const renderFieldValue = (field: CustomField) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={field.value as string || ''}
            onChange={(e) => handleUpdateField(field.id, { value: e.target.value })}
            placeholder="Enter text..."
            className="h-9 text-sm"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={field.value as number || ''}
            onChange={(e) => handleUpdateField(field.id, { value: e.target.value ? Number(e.target.value) : null })}
            placeholder="Enter number..."
            className="h-9 text-sm"
          />
        );
      case 'select':
        if (!field.options || field.options.length === 0) {
          return <span className="text-sm text-muted-foreground italic">No options configured</span>;
        }
        return (
          <Select 
            value={field.value as string || ''} 
            onValueChange={(value) => handleUpdateField(field.id, { value })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select option..." />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border/30 z-50">
              <SelectItem value="">None</SelectItem>
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-foreground">Custom Fields</Label>
        {!isCreating && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreating(true)}
            className="h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Field
          </Button>
        )}
      </div>

      {/* Create new field form */}
      {isCreating && (
        <div className="p-4 bg-muted/20 rounded-lg border border-border/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="field-name" className="text-xs font-medium">Field Name</Label>
              <Input
                id="field-name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Enter field name..."
                className="h-8 text-sm"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="field-type" className="text-xs font-medium">Type</Label>
              <Select value={newFieldType} onValueChange={(value: 'text' | 'number' | 'select') => setNewFieldType(value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border/30 z-50">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {newFieldType === 'select' && (
            <div>
              <Label htmlFor="field-options" className="text-xs font-medium">Options (comma separated)</Label>
              <Input
                id="field-options"
                value={newFieldOptions}
                onChange={(e) => setNewFieldOptions(e.target.value)}
                placeholder="Option 1, Option 2, Option 3..."
                className="h-8 text-sm"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreateField} disabled={!newFieldName.trim()}>
              Create Field
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Existing fields */}
      {localFields.length > 0 && (
        <div className="space-y-3">
          {localFields.map((field) => (
            <div key={field.id} className="p-3 bg-muted/10 rounded-lg border border-border/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {field.type}
                  </Badge>
                  <span className="font-medium text-sm">{field.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Switch
                      checked={field.visible}
                      onCheckedChange={(checked) => handleUpdateField(field.id, { visible: checked })}
                      className="scale-75"
                    />
                    <span className="text-xs text-muted-foreground">
                      {field.visible ? (
                        <><Eye className="w-3 h-3 inline mr-1" />Show in card</>
                      ) : (
                        <><EyeOff className="w-3 h-3 inline mr-1" />Edit only</>
                      )}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteField(field.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Value</Label>
                {renderFieldValue(field)}
              </div>
              
              {field.type === 'select' && field.options && field.options.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Options: {field.options.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {localFields.length === 0 && !isCreating && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No custom fields yet.</p>
          <p className="text-xs mt-1">Click "Add Field" to create your first custom field.</p>
        </div>
      )}
    </div>
  );
}
